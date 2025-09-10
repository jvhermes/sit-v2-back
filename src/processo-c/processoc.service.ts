import { Injectable, ConflictException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DescricaoLoteDTO, DescricaoPessoaDTO, GetProcessoPDTO } from "src/processo-p/dto/processop-dto";
import { CreateProcessocDTO } from "./dto/processoc-dto";
import { format } from "date-fns";


@Injectable()
export class ProcessocService {

    constructor(private prisma: PrismaService) { }

  


    async create({ ano, atividade_id, observacao, setor_id, num_processo, tipo_id, descricao_lote, descricao_pessoa, lotes_id }: CreateProcessocDTO,cartorio_id:string) {
        try {
            const processo = await this.prisma.processoCartorio.create({
                data: {
                    num_processo,
                    ano,
                    observacao,
                    tipo_id: parseInt(tipo_id),
                    destino_id: setor_id,
                    fonte_id: cartorio_id,
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
        return this.prisma.processoCartorio.findFirst({
            where: {
                id
            }, include: {
                cartorio: true,
                setor: true,
                descricao_lotes: true,
                descricao_pessoas: true,
                tipo: true,
                lote_vinculado: true
            }
        })
        
    }
    async get({ perfil, ativo ,setor_id,cartorio_id }: GetProcessoPDTO) {

        const where: any = { ativo };

        if (perfil === "CARTORIO") {
            where.destino_id = setor_id
        } else if (perfil === "PREFEITURA") {
            where.fonte_id = cartorio_id
        }

        const res = await this.prisma.processoCartorio.findMany({
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

            }
        })
        return processos


    }

    async close(id: number) {

        const data = new Date()
        try {
            const processo = await this.prisma.processoCartorio.update({
                where: { id },
                data: {
                    ativo: false,
                    respondido_em: data,

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
                    processo_cartorio_id: id
                }
            })
            await this.prisma.descricaoLotes.deleteMany({
                where: {
                    processo_cartorio_id: id
                }
            })
            await this.prisma.descricaoPessoas.deleteMany({
                where: {
                    processo_cartorio_id: id
                }
            })
            return await this.prisma.processoCartorio.delete({
                where: {
                    id
                }
            })


        } catch {
            throw new Error('Não foi possível concluir a exclusão');
        }
    }

    async createDescricaoPessoa(data: DescricaoPessoaDTO[], processo_cartorio_id: number) {

        const enrichedData = data.map((item) => ({
            ...item,
            processo_cartorio_id: processo_cartorio_id,
        }));
        return this.prisma.descricaoPessoas.createMany({
            data: enrichedData
        })
    }

    async createDescricaoLote(data: DescricaoLoteDTO[], processo_cartorio_id: number) {

        const enrichedData = data.map((item) => ({
            ...item,
            processo_cartorio_id: processo_cartorio_id,
        }));
        return this.prisma.descricaoLotes.createMany({
            data: enrichedData
        })
    }
    async createLoteVinculado(lotes_id: string[], processo_cartorio_id: number) {

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
                        processo_cartorio_id
                    }
                })
            }
        })
    }

}