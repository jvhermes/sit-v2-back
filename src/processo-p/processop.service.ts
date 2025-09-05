import { Injectable, ConflictException } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProcessopDTO, DescricaoLoteDTO, DescricaoPessoaDTO } from "./dto/processop-dto";


@Injectable()
export class ProcessopService {

    constructor(private prisma: PrismaService) { }

    async delete(id: number) {
        try {
            await this.prisma.loteVinculado.deleteMany({
                where: {
                    processo_prefeitura_id: id
                }
            })
            await this.prisma.descricaoLotes.deleteMany({
                where: {
                    processo_id: id
                }
            })
            await this.prisma.descricaoPessoas.deleteMany({
                where: {
                    processo_prefeitura_id: id
                }
            })
            return await this.prisma.processoPrefeitura.delete({
                where: {
                    id
                }
            })


        } catch {
            throw new Error('Não foi possível finalizar a exclusão');
        }
    }



    async create({ ano, atividade_id, texto, cartorio_id, num_processo, prazo, tipo_id, descricao_lote, descricao_pessoa, lotes_id }: CreateProcessopDTO) {
        try {
            await this.prisma.processoPrefeitura.create({
                data: {
                    num_processo,
                    ano,
                    prazo,
                    texto,
                    tipo_id: parseInt(tipo_id),
                    destino_id: cartorio_id,
                    fonte_id: cartorio_id,
                    atividade_id

                },
            });
        } catch (error) {
            if (error.code === 'P2002') {

                throw new ConflictException(`Já existe um processo com esse número `);
            }
            throw error;
        }

        await this.createLoteVinculado(lotes_id)

        if (descricao_lote)
            await this.createDescricaoLote(descricao_lote)

        if (descricao_pessoa)
            await this.createDescricaoPessoa(descricao_pessoa)

        return { message: 'Processos criado' };

    }

    async get() {

    }

    async close(){

    }

    async responde(){
        
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async atualizarStatus() {
        await this.prisma.processoPrefeitura.updateMany({
            where: {
                status: 'PENDENTE',
                prazo: { lt: new Date() },
            },
            data: {
                status: 'ATRASADO',
            },
        });
        console.log('[CRON] Processos atrasados atualizados');
    }

    async createDescricaoPessoa(data: DescricaoPessoaDTO[]) {

        return this.prisma.descricaoPessoas.createMany({
            data
        })
    }

    async createDescricaoLote(data: DescricaoLoteDTO[]) {

        return this.prisma.descricaoLotes.createMany({
            data
        })
    }
    async createLoteVinculado(lotes_id: string[]) {

        return lotes_id.map(async (item) => {
            const lote_res = await this.prisma.lote.findFirst({
                where: {
                    id: parseInt(item)
                }
            })

            if (lote_res) {
                const {numero,codigo_imovel,bairro,quadra,lote,insc_imob,proprietario,area_total,logradouro,testada,matricula} = lote_res
                await this.prisma.loteVinculado.create({
                    data: {
                        codigo_imovel,
                        numero,
                        bairro,
                        quadra,
                        lote,
                        insc_imob,
                        proprietario,
                        area_total,
                        logradouro,
                        testada,
                        matricula
                    }
                })
            }
        })
    }
}

