import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DataService } from './data.service';


@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) { }

    @Get('criar/prefeitura')
    async data_criar_prefeitura() {
        return this.dataService.data_criar_prefeitura()
    }

    @Get('criar/cartorio')
    async data_criar_cartorio() {
        return this.dataService.data_criar_cartorio()
    }


    @Get('admin')
    async data_admin() {
        return this.dataService.data_admin()
    }

}