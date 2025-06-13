import { Controller, Get,Post,Put,Delete,Body, Param } from '@nestjs/common';
import { AtividadeService } from './atividade.service';


@Controller('atividade')
export class AtividadeController{

    constructor(private readonly atividadeService:AtividadeService){}

    @Post()
    async create(@Body() nome:string){
        return this.atividadeService.create(nome)
    }

    @Get()
    async list(){
        return this.atividadeService.list()
    }

    @Put(':id')
    async update(@Body() nome:string, @Param() id:string ){
        return this.atividadeService.update(nome,id)
    }
}
