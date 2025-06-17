import { Controller, Get,Post,Put,Delete,Body, Param } from '@nestjs/common';
import { CartorioService } from './cartorio.service';


@Controller('cartorio')
export class CartorioController{

    constructor(private readonly cartorioService:CartorioService){}

    @Post()
    async create(@Body() nome:string){
        return this.cartorioService.create(nome)
    }

    @Get()
    async list(){
        return this.cartorioService.list()
    }

    @Put(':id')
    async update(@Body() nome:string, @Param("id") id:string ){
        return this.cartorioService.update(nome,id)
    }
}
