import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CartorioService } from './cartorio.service';


@Controller('cartorio')
export class CartorioController {

    constructor(private readonly cartorioService: CartorioService) { }

    @Post()
    async create(@Body() body: { nome: string }) {
        return this.cartorioService.create(body.nome)
    }

    @Get()
    async list() {
        return this.cartorioService.list()
    }

    @Put(':id')
    async update(@Body() body: { nome: string }, @Param("id") id: string) {
        return this.cartorioService.update(id,body.nome )
    }

    @Delete(':id')
    async delete(@Param("id") id: string) {
        return this.cartorioService.delete(id)
    }
}
