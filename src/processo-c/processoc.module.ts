import { Module } from "@nestjs/common";
import { ProcessocService } from "./processoc.service";
import { ProcessocController } from "./processoc.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports:[PrismaModule],
    controllers:[ProcessocController],
    providers:[ProcessocService],
    exports:[ProcessocService]
})

export class ProcessoCModule{}