import { Injectable } from "@nestjs/common";
import * as csv from 'csv-parser';
import { PrismaService } from "src/prisma/prisma.service";
import * as streamifier from 'streamifier';

@Injectable()
export class CsvService {

    constructor(private prisma: PrismaService) { }

    async create(data: any[]) {
        await this.prisma.lote.deleteMany()
        const result = await this.prisma.lote.createMany({
            data,
            skipDuplicates: true,
        });
        return result;
    }



    async parseCsv(buffer: Buffer): Promise<any[]> {
        const rows: any[] = [];

        let content = buffer.toString();
        if (content.startsWith('"')) {
            content = content.replace(/^"|"$/gm, '');
        }
        const cleanedBuffer = Buffer.from(content);

        const colunasMapeadas = {
            codigo_imovel: ['codigoimovel', 'bic'],
            numero: ['numerocorresp', 'numerocorrespondente', 'numero_predial'],
            bairro: ['bairrocorresp', 'bairrocorrespondente', 'nome_bairro'],
            quadra: ['quadra'],
            lote: ['lote'],
            insc_imob: ['inscimob', 'inscimobiliaria', 'inscricaoimobiliaria', 'inscricao'],
            proprietario: ['proprietario', 'nome_proprietario'],
            area_total: ['arealote', 'area_terreno'],
            logradouro: ['nomelogradouro', 'nome_logradouro'],
            testada: ['testadaprincipal', 'testada_principal'],
            matricula: ['matricula_numero'],
        };

        const normalize = (str: string) => {
            return str.trim().toLowerCase().replace(/[\s_]/g, '');
        }

        return new Promise((resolve, reject) => {

            const readable = streamifier.createReadStream(cleanedBuffer);

            let headerMap: Record<string, string> = {};


            readable
                .pipe(csv({ separator: ';' }))
                .on('headers', (headers) => {

                    for (const [nomePadrao, variacoes] of Object.entries(colunasMapeadas)) {
                        const encontrado = headers.find((h) =>
                            variacoes.includes(normalize(h)),
                        );
                        if (encontrado) {
                            headerMap[normalize(encontrado)] = nomePadrao;
                        }
                    }

                    const obrigatorias = [
                        'codigo_imovel', 'numero', 'bairro', 'quadra', 'lote', 'area_total', 'testada', 'logradouro', 'insc_imob', 'proprietario'
                    ];
                    const faltando = obrigatorias.filter((col) => !Object.values(headerMap).includes(col));
                    if (faltando.length > 0) {
                        throw new Error(`CSV inválido. Colunas obrigatórias ausentes: ${faltando.join(', ')}`);
                    }
                })
                .on('data', (data) => {
                    const linhaFiltrada: Record<string, any> = {};
                    for (const [colunaOriginal, valor] of Object.entries(data)) {
                        const colunaAlvo = headerMap[normalize(colunaOriginal)];
                        if (colunaAlvo) {
                            linhaFiltrada[colunaAlvo] = valor;
                        }
                    }
                    rows.push(linhaFiltrada);
                })
                .on('end', () => resolve(rows))
                .on('error', reject);
        });
    }






}