import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class CartorioService {


    constructor(private prisma: PrismaService) { }


    async create(nome: string) {
        try {
            return await this.prisma.cartorio.create({
                data: { nome },
            });
        } catch (error) {
            if (error.code === 'P2002') {

                throw new ConflictException(`Já existe uma atividade com o nome "${nome}".`);
            }
            throw error;
        }
    }

    async list() {
        return this.prisma.cartorio.findMany()
    }

    async update(id: string, nome: string) {

        try {
            return await this.prisma.cartorio.update({
                where: { id },
                data: { nome }
            });
        } catch (error) {
            if (error.code === 'P2002') {

                throw new ConflictException(`Já existe uma atividade com o nome "${nome}".`);
            }
            if (error.code === 'P2025') {
                throw new NotFoundException(`Atividade com id "${id}" não encontrada.`);
            }
            throw error;
        }
    }

    async delete(id: string) {

        return this.prisma.cartorio.delete({
            where: {
                id
            }
        })
    }
}