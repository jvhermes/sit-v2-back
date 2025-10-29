import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from "./dto/update-user.dto";


@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    async exists(id: string) {
        if (!(await this.readOne(id))) {
            throw new NotFoundException('Usuário não encontrado')
        }
    }

    async delete(id: string) {
        return this.prisma.usuario.delete({
            where: {
                id
            }
        })
    }

    async update_senha(id: string, senha: string) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        return this.prisma.usuario.update({
            where: {
                id
            },
            data: {
                senha: hashedPassword
            }
        })

    }

    async create({ nome, email, senha, perfil, ativo, avatar, cartorio_id, setor_id }: CreateUserDTO) {

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        return this.prisma.usuario.create({
            data: {
                nome,
                email,
                senha: hashedPassword,
                perfil,
                ativo,
                avatar,
                cartorio_id: cartorio_id || undefined,
                setor_id: setor_id || undefined,
            }
        })
    }

    async update({ nome, email, perfil, ativo, avatar, cartorio_id, setor_id }: UpdateUserDTO, id: string) {


        return this.prisma.usuario.update({
            where: { id },
            data: {
                nome,
                email,
                perfil,
                ativo,
                avatar,
                cartorio_id: cartorio_id || undefined,
                setor_id: setor_id || undefined,
            }
        })

    }
    async list() {
        return this.prisma.usuario.findMany()
    }

    async readOne(id: string) {
        return this.prisma.usuario.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                nome: true,
                email: true,
                avatar: true,
                perfil: true,
                cartorio: true,
                setor: true,
                ativo: true
            }
        })
    }


}