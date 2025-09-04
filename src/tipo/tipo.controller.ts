import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TipoService } from './tipo.service';


@Controller('tipo')
export class TipoController {

    constructor(private readonly tipoService: TipoService) { }

    @Post()
    async create(@Body() body: { nome: string }) {
        return this.tipoService.create(body.nome)
    }

    @Get()
    async list() {
        return this.tipoService.list()
    }

    @Put(':id')
    async update(@Body() body: { nome: string }, @Param("id") id: number) {
        return this.tipoService.update(id, body.nome)
    }

    @Delete(':id')
    async delete(@Param("id") id: string) {
        return this.tipoService.delete(parseInt(id))
    }
}
