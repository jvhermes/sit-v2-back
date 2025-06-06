import { Module } from "@nestjs/common";
import { AtividadeController } from "./atividade.controller";
import { AtividadeService } from "./atividade.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports:[PrismaModule],
    controllers:[AtividadeController],
    providers:[AtividadeService],
    exports:[AtividadeService]
})

export class UserModule{}