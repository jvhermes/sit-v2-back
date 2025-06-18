import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Usuario } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
    ) { }

    async createToken(user: Usuario) {

        return {
            acessToken: this.jwtService.sign({
                id: user.id,
                name: user.nome,
                email: user.email
            }, {
                expiresIn: "7 days",
                subject: user.id,
                issuer: "login",
                audience: 'users'
            })
        }
    }
    async checkToken(token: string) {

        try{
            const data = this.jwtService.verify(token,{
                audience: 'users',
                issuer:'login'
            })

            return data
        }catch(err){
            throw new BadRequestException(err)
        }

    }
    async login(email: string, password: string) {

        const user = await this.prisma.usuario.findFirst({
            where: {
                email,
                senha: password
            }
        })

        if (!user) {
            throw new UnauthorizedException('Email e/ou senha incorretos!')
        }

        return this.createToken(user);
    }





}