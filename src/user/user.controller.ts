import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/uptade-user.dto";
import { PatchUserDTO } from "./dto/patch-user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{

    constructor(private readonly userService:UserService){}

    @Post()
    async create(@Body() {name,email,password} : CreateUserDTO){
        return this.userService.create({name,email,password})
    }

    @Get()
    async list(){
        return this.userService.list()
    }

    @Get(':id')
    async readOne(@Param('id') id:string){
        return this.userService.readOne(id)
    }

    @Put(':id')
    async update(@Body() body:UpdateUserDTO,@Param('id') id:number){
        return{
            method:'put',
            body,
            id,
        }
    }


    @Delete(':id')
    async deleteUnic(@Param('id') id:number){
        return{
           id
        }
    }
}
