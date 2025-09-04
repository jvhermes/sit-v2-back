import { Controller, Body, Get, Post, Put, Delete, Param } from '@nestjs/common';

@Controller('processop')
export class ProcessopController {
    @Post()
    async create(@Body() body: { nome: string }) {

    }

    @Put(':id')
    async update(@Body() body: { nome: string }, @Param("id") id: string) {
        //return this.processopService.update(body.nome, id)
    }

    @Delete(':id')
    async delete(@Param("id") id: string) {
        //return this.processopService.delete(id)
    }
}