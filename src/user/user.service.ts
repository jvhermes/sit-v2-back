import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class UserService {


    constructor(private prisma: PrismaService){}

    async exists(id:string){
        if(!(await this.show(id))){
            throw new NotFoundException('Usuário não encontrado')
        }
    }

    async create({name,email,password,perfil}:CreateUserDTO){
        return this.prisma.usuario.create({
            data:{
                nome:name,
                email:email,
                senha:password,
                perfil:perfil
            }
        })
    }

    async list(){
        return this.prisma.usuario.findMany()
    }

    async readOne(id:string){
        return this.prisma.usuario.findUnique({
            where:{
                id
            }
        })
    }

    async show(id:string){
        return this.prisma.usuario.findUnique({
            where:{
                id
            }
        })
    }
}