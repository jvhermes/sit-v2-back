import { Injectable, ConflictException } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from "src/prisma/prisma.service";
import {
    CloseProcessopDTO,
    CreateProcessopDTO,
    DescricaoLoteDTO,
    DescricaoPessoaDTO,
    GetProcessoPDTO,
    RespondeLoteDTO,
    RespondePessoaDTO
} from "./dto/processop-dto";
import { format } from "date-fns"

@Injectable()
export class ProcessopService {

    constructor(private prisma: PrismaService) { }



    async create({ ano, atividade_id, texto, cartorio_id, num_processo, prazo, tipo_id, descricao_lote, descricao_pessoa, lotes_id }: CreateProcessopDTO,setor_id:string) {
        try {
            const processo = await this.prisma.processoPrefeitura.create({
                data: {
                    num_processo,
                    ano,
                    prazo,
                    texto,
                    tipo_id: parseInt(tipo_id),
                    destino_id: cartorio_id,
                    fonte_id: setor_id,
                    atividade_id

                },
            });
            await this.createLoteVinculado(lotes_id, processo.id)

            if (descricao_lote)
                await this.createDescricaoLote(descricao_lote, processo.id)

            if (descricao_pessoa)
                await this.createDescricaoPessoa(descricao_pessoa, processo.id)

            return { message: 'Processos criado' };
        } catch (error) {
            if (error.code === 'P2002') {

                throw new ConflictException(`Já existe um processo com esse número `);
            }
            throw error;
        }



    }

    async get_one(idS: string) {
        const id = parseInt(idS)
        return this.prisma.processoPrefeitura.findFirst({
            where: {
                id
            }, include: {
                cartorio: true,
                setor: true,
                descricao_lotes: true,
                descricao_pessoas: true,
                tipo: true,
                lote_vinculado: true,
                respostaPessoa: true,
                resposta: {
                    include: {
                        descricao: true
                    }
                },

            }
        })

    }

    async get({ perfil, ativo ,setor_id,cartorio_id  }: GetProcessoPDTO) {

        const where: any = { ativo };

        if (perfil === "CARTORIO") {
            where.destino_id = cartorio_id
        } else if (perfil === "PREFEITURA") {
            where.fonte_id = setor_id
        }

        const res = await this.prisma.processoPrefeitura.findMany({
            where,
            include: {
                lote_vinculado: true,
                tipo: true
            }

        })

        const processos = res?.map((item) => {
            return {
                id: item.id,
                numero: item.num_processo.toString(),
                tipo: item.tipo.nome,
                proprietario: item.lote_vinculado[0].proprietario || "",
                bairro: item.lote_vinculado[0].bairro || "",
                quadra: item.lote_vinculado[0].quadra || "",
                lote: item.lote_vinculado[0].lote || "",
                criado: format(item.criado_em, "dd/MM/yyy"),
                prazo: format(item.prazo, "dd/MM/yyy"),
                status: item.status.toLowerCase()
            }
        })
        return processos


    }


    async close(id: number, conclusao: string) {

        try {
            const processo = await this.prisma.processoPrefeitura.update({
                where: { id },
                data: {
                    ativo: false,
                    conclusao
                }
            })
            return processo;
        } catch {
            return null
        }
    }
    
    async delete(id: number) {
        try {
            await this.prisma.loteVinculado.deleteMany({
                where: {
                    processo_prefeitura_id: id
                }
            })
            await this.prisma.descricaoLotes.deleteMany({
                where: {
                    processo_prefeitura_id: id
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
            throw new Error('Não foi possível concluir a exclusão');
        }
    }


    async responde_lote({ alvara, descricao, texto, processo_id, processo_status, data }: RespondeLoteDTO) {

        const aprovacao = await this.prisma.resposta.create({
            data: {
                observacao: texto,
                alvara,
                processo_id
            }
        })

        for await (let item of descricao) {
            await this.prisma.descricaoResposta.create({
                data: {
                    matricula: item.matricula,
                    data_registro: item.data_registro,
                    transcricao: item.transcricao,
                    lote: item.lote,
                    aprovacao_id: aprovacao.id,
                    descricao_id: item.descricao_id
                }
            })
        }

        await this.prisma.processoPrefeitura.update({
            where: {
                id: processo_id
            },
            data: {
                status: processo_status === "PENDENTE" ? "RESPONDIDO" : "RESPONDIDO_COM_ATRASO",
                respondido_em: data
            }
        })
    }

    async responde_pessoa({ alvara, texto, processo_id, processo_status, data }: RespondePessoaDTO) {
        const aprovacao = await this.prisma.respostaPessoa.create({
            data: {
                observacao: texto,
                alvara,
                processo_id
            }
        })

        await this.prisma.processoPrefeitura.update({
            where: {
                id: processo_id
            },
            data: {
                status: processo_status === "PENDENTE" ? "RESPONDIDO" : "RESPONDIDO_COM_ATRASO",
                respondido_em: data
            }
        })

        return aprovacao

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

    async createDescricaoPessoa(data: DescricaoPessoaDTO[], processo_prefeitura_id: number) {

        const enrichedData = data.map((item) => ({
            ...item,
            processo_prefeitura_id: processo_prefeitura_id,
        }));
        return this.prisma.descricaoPessoas.createMany({
            data: enrichedData
        })
    }

    async createDescricaoLote(data: DescricaoLoteDTO[], processo_prefeitura_id: number) {
        const enrichedData = data.map((item) => ({
            ...item,
            processo_prefeitura_id: processo_prefeitura_id,
        }));
        return this.prisma.descricaoLotes.createMany({
            data: enrichedData
        })
    }
    async createLoteVinculado(lotes_id: string[], processo_prefeitura_id: number) {

        return lotes_id.map(async (item) => {
            const lote_res = await this.prisma.lote.findFirst({
                where: {
                    id: parseInt(item)
                }
            })

            if (lote_res) {
                const { numero, codigo_imovel, bairro, quadra, lote, insc_imob, proprietario, area_total, logradouro, testada, matricula } = lote_res
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
                        matricula,
                        processo_prefeitura_id
                    }
                })
            }
        })
    }
}

