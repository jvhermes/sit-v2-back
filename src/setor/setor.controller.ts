import { Controller,Body, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('setor')
export class SetorController {
    @Post()
    async create(@Body() { nome }) {

    }
}