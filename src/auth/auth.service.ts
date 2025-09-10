import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Usuario } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
    ) { }

    async createToken(user: Usuario) {

        return {
            acessToken: this.jwtService.sign({
                nome: user.nome,
                perfil:user.perfil,
                cartorio_id:user.cartorio_id,
                setor_id:user.setor_id
            }, {
                expiresIn: "7 days",
                subject: user.id,
                issuer: "login",
                audience: 'users'
            })
        }
    }
    async checkToken(token: string) {

        try {
            const data = this.jwtService.verify(token, {
                audience: 'users',
                issuer: 'login'
            })

            return data
        } catch (err) {
            throw new BadRequestException(err)
        }

    }
    async login(email: string, senha: string) {

        const user = await this.prisma.usuario.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException('Usuário não encontrado');

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) throw new UnauthorizedException('Senha incorreta');

        return user;
    }





}