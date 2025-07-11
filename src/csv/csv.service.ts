import { Injectable } from "@nestjs/common";
import * as csv from 'csv-parser';
import { PrismaService } from "src/prisma/prisma.service";
import { Lote } from "@prisma/client";
import * as streamifier from 'streamifier';

@Injectable()
export class CsvService {


    constructor(private prisma: PrismaService) { }

    async create(data: any[]) {
        const result = await this.prisma.usuario.createMany({
            data,
            skipDuplicates: true,
        });
        return result;
    }

    async parseCsv(buffer: Buffer): Promise<any[]> {
        const rows: any[] = [];

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

        return new Promise((resolve, reject) => {
            const readable = streamifier.createReadStream(buffer);
            let headerMap: Record<string, string> = {};
            readable
                .pipe(csv())
                .on('headers', (headers) => {
                    // Mapeia os headers do CSV para os nomes desejados
                    for (const [nomePadrao, variacoes] of Object.entries(colunasMapeadas)) {
                        const encontrado = headers.find((h) =>
                            variacoes.includes(h.trim().toLowerCase().replace(/\s/g, '')),
                        );
                        if (encontrado) {
                            headerMap[encontrado] = nomePadrao;
                        }
                    }
                })
                .on('data', (data) => {
                    const linhaFiltrada: Record<string, any> = {};
                    for (const [colunaOriginal, valor] of Object.entries(data)) {
                        const colunaAlvo = headerMap[colunaOriginal];
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
    async list() {
        return this.prisma.lote.findMany()
    }

    async delete(id: string) {

        return this.prisma.cartorio.delete({
            where: {
                id
            }
        })
    }
}