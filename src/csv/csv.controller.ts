import { Controller,Body, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('csv')
export class ProcessocController {
    @Post()
    async create(@Body() { csv }) {

    }
}