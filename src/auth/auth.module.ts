import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: 
        [JwtModule.register({
        secret: process.env.JWT_SECRET || 'AkR.whf9E,ILPd5,IpA<WV~W-)093Xjg',
        }),
        UserModule,
        PrismaModule
    
    ],
    controllers: [AuthController],
    providers:[AuthService,JwtStrategy]
})
export class AuthModule { }