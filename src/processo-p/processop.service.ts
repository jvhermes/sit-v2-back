import { Injectable, ConflictException } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from "src/prisma/prisma.service";


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
            const processo = await this.prisma.processoPrefeitura.delete({
                where: {
                    id
                }
            })
        } catch {
            throw new Error('Não foi possível finalizar a exclusão');
        }
    }

    async create() {

    }

    async get() {

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
}

