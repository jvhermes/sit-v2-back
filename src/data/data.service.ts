import { Injectable, ConflictException } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class DataService {


    constructor(private prisma: PrismaService) { }
    async data_criar_prefeitura() {

        const [atividades, cartorios, lotes, tipos] = await Promise.all([
            this.prisma.atividade.findMany(),
            this.prisma.cartorio.findMany(),
            this.prisma.lote.findMany(),
            this.prisma.tipo.findMany(),
        ])

        return { atividades, cartorios, lotes, tipos }
    }
    async data_criar_cartorio() {

        const [atividades, setores, lotes, tipos] = await Promise.all([
            this.prisma.atividade.findMany(),
            this.prisma.setor.findMany(),
            this.prisma.lote.findMany(),
            this.prisma.tipo.findMany(),
        ])

        return { atividades, setores, lotes, tipos }
    }


    async data_admin() {

        const [tipos, atividades, cartorios, setores, user] = await Promise.all([
            this.prisma.tipo.findMany(),
            this.prisma.atividade.findMany(),
            this.prisma.cartorio.findMany(),
            this.prisma.setor.findMany(),
            this.prisma.usuario.findMany({
                include: {
                    cartorio: true,
                    setor: true
                }
            })
        ])

        return { tipos, atividades, cartorios, setores, user }
    }

}
