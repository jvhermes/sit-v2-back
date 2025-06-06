import { Controller,Body, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('cartorio')
export class CartorioController {
    @Post()
    async create(@Body() { nome }) {

    }
}