import { Injectable, ConflictException } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class TipoService {


    constructor(private prisma: PrismaService) { }


    async create(nome: string) {
        try {
            return await this.prisma.tipo.create({
                data: { 
                    nome ,
                    tipo:"DESMEMBRAMENTO"
                },
            });
        } catch (error) {
            if (error.code === 'P2002') {

                throw new ConflictException(`Já existe uma atividade com o nome "${nome}".`);
            }
            throw error;
        }
    }

    async list() {
        return this.prisma.tipo.findMany()
    }

    async update(id: number, nome: string) {

        try {
            return await this.prisma.tipo.update({
                where: { id },
                data: { nome }
            });
        } catch (error) {
            if (error.code === 'P2002') {

                throw new ConflictException(`Já existe uma atividade com o nome "${nome}".`);
            }
            throw error;
        }
    }

    async delete(id: number) {

        return this.prisma.tipo.delete({
            where: {
                id
            }
        })
    }
}