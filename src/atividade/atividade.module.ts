import { Module } from "@nestjs/common";
import { UserController } from "./atividade.controller";
import { UserService } from "./atividade.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports:[PrismaModule],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})

export class UserModule{}