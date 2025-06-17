import { Controller, Get,Post,Put,Delete,Body, Param } from '@nestjs/common';
import { TipoService } from './tipo.service';


@Controller('tipo')
export class TipoController{

    constructor(private readonly tipoService:TipoService){}

    @Post()
    async create(@Body() nome:string){
        return this.tipoService.create(nome)
    }

    @Get()
    async list(){
        return this.tipoService.list()
    }

    @Put(':id')
    async update(@Body("nome") nome:string, @Param("id") id:number ){
        return this.tipoService.update(id, nome)
    }
}
