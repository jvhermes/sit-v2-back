import { Controller, Get,Post,Put,Delete,Body, Param } from '@nestjs/common';
import { AtividadeService } from './atividade.service';


@Controller('atividade')
export class AtividadeController{

    constructor(private readonly atividadeService:AtividadeService){}

    @Post()
    async create(@Body() body:{ nome:string}){
        return this.atividadeService.create(body.nome)
    }

    @Get()
    async list(){
        return this.atividadeService.list()
    }

    @Put(':id')
    async update(@Body() body:{ nome:string}, @Param("id") id:string ){
        return this.atividadeService.update(body.nome,id)
    }

    @Delete(':id')
    async delete(@Param("id") id:string ){
        return this.atividadeService.delete(id)
    }
}
