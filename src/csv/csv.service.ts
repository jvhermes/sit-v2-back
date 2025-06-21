import { Injectable, ConflictException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Lote } from "@prisma/client";

@Injectable()
export class CsvService {


    constructor(private prisma: PrismaService) { }

    async create(lote: Lote) {
        try {
            return await this.prisma.lote.create({
                data: lote ,
            });
        } catch (error) {
            if (error.code === 'P2002') {

                throw new ConflictException(`Já existe uma atividade com o nome "${lote}".`);
            }
            throw error;
        }
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