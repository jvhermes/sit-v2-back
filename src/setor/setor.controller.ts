import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SetorService } from './setor.service';


@Controller('setor')
export class SetorController {

    constructor(private readonly setorService: SetorService) { }

    @Post()
    async create(@Body() body: { nome: string }) {
        return this.setorService.create(body.nome)
    }

    @Get()
    async list() {
        return this.setorService.list()
    }

    @Put(':id')
    async update(@Body() body: { nome: string }, @Param("id") id: string) {
        return this.setorService.update(id,body.nome)
    }

    @Delete(':id')
    async delete(@Param("id") id: string) {
        return this.setorService.delete(id)
    }
}
