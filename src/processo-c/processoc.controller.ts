import { Controller,Body, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('processoc')
export class ProcessocController {
    @Post()
    async create(@Body() { nome }) {

    }
}