import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'segredo',
        });
    }

    async validate(payload: any) {

        return {
            id: payload.sub,
            nome: payload.nome,
            perfil: payload.perfil,
            cartorio_id: payload.cartorio_id,
            setor_id: payload.setor_id,
        };
    }

}

