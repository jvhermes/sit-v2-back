import { Controller,Body, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('tipo')
export class TipoController {
    @Post()
    async create(@Body() { nome }) {

    }
}