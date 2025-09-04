import { Module } from "@nestjs/common";
import { ProcessopService } from "./processop.service";
import { ProcessopController } from "./processop.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports:[PrismaModule],
    controllers:[ProcessopController],
    providers:[ProcessopService],
    exports:[ProcessopService]
})

export class AtividadeModule{}