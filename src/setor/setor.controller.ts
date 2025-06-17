import { Controller, Get,Post,Put,Delete,Body, Param } from '@nestjs/common';
import { SetorService } from './setor.service';


@Controller('setor')
export class SetorController{

    constructor(private readonly setorService:SetorService){}

    @Post()
    async create(@Body() nome:string){
        return this.setorService.create(nome)
    }

    @Get()
    async list(){
        return this.setorService.list()
    }

    @Put(':id')
    async update(@Body() nome:string, @Param("id") id:string ){
        return this.setorService.update(nome,id)
    }
}
