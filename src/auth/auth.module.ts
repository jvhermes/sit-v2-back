import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
    imports: 
        [JwtModule.register({
        secret: 'AkR.whf9E,ILPd5,IpA<WV~W-)093Xjg'
        }),
        UserModule,
        PrismaModule
    
    ],
    controllers: [AuthController],
    providers:[AuthService]
})
export class AuthModule { }