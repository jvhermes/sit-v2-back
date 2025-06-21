import { Controller, Get,Post,Put,Delete,Body, Param } from '@nestjs/common';
import { CsvService } from './csv.service';
import { Lote } from '@prisma/client';


@Controller('csv')
export class CsvController{

    constructor(private readonly csvService:CsvService){}

    @Post()
    async create(@Body() nome:Lote){
        return this.csvService.create(nome)
    }

    @Get()
    async list(){
        return this.csvService.list()
    }


}
