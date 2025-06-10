import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class AtividadeService {


    constructor(private prisma: PrismaService){}

    async exists(id:string){
        if(!(await this.show(id))){
            throw new NotFoundException('Usuário não encontrado')
        }
    }

    async create({name,email,password}/*:CreateUserDTO*/){
        return this.prisma.cartorio.create({
            data:{
                nome:name,
                email:email,
                senha:password,
            }
        })
    }

    async list(){
        return this.prisma.cartorio.findMany()
    }

    async show(id:string){
        return this.prisma.cartorio.findUnique({
            where:{
                id
            }
        })
    }
}