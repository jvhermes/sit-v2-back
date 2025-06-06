import { Controller,Body, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('processop')
export class ProcessopController {
    @Post()
    async create(@Body() { nome }) {

    }
}