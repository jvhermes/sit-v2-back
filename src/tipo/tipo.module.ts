import { Module } from "@nestjs/common";
import { TipoController } from "./tipo.controller";
import { TipoService } from "./tipo.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports:[PrismaModule],
    controllers:[TipoController],
    providers:[TipoService],
    exports:[TipoService]
})

export class TipoModule{}