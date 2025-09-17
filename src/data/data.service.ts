import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';

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

    async seed() {
        const user = await this.prisma.usuario.findMany()

        if (user.length <= 0) {

            const setor = await this.prisma.setor.create({
                data: {
                    nome: "setor base"
                }
            })

            const cartorio = await this.prisma.cartorio.create({
                data: {
                    nome: "cartorio1"
                }
            })

            await this.prisma.tipo.create({
                data: {
                    nome: "Desmembramento",
                    tipo: "DESMEMBRAMENTO"
                }
            })
            await this.prisma.tipo.create({
                data: {
                    nome: "Remembramento",
                    tipo: "REMEMBRAMENTO"
                }
            })

            await this.prisma.tipo.create({
                data: {
                    nome: "Outros",
                    tipo: "OUTRO"
                }
            })
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash("123456", saltRounds);

            const userCriado = await this.prisma.usuario.create({
                data: {
                    nome: "admin",
                    senha: hashedPassword,
                    email: "admin@admin.com",
                    setor_id: setor.id,
                    cartorio_id: cartorio.id,
                    avatar: "1",
                    perfil: "ADMIN"
                }
            })
            return userCriado



        } else return user
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
