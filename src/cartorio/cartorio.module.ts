import { Module } from "@nestjs/common";
import { CartorioController } from "./cartorio.controller";
import { CartorioService } from "./cartorio.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports:[PrismaModule],
    controllers:[CartorioController],
    providers:[CartorioService],
    exports:[CartorioService]
})

export class CartorioModule{}