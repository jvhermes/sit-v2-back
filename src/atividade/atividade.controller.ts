import { Controller, Get,Post,Put,Delete,Body } from '@nestjs/common';

@Controller('atividade')
export class AtividadeController{

    @Post()
    async create(@Body() {nome}){

    }

}
