import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() { nome, email, senha, perfil, ativo, avatar, cartorio_id, setor_id }: CreateUserDTO) {
        return this.userService.create({ nome, email, senha, perfil, ativo, avatar, cartorio_id, setor_id })
    }

    @Get()
    async list() {
        return this.userService.list()
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me( @Req() req) {
        const id = req.user.id
        return this.userService.readOne(id)
    }

    
    @Get(':id')
    async readOne(@Param('id') id: string) {
        return this.userService.readOne(id)
    }

    @Put(':id')
    async update(@Body() { nome, email, perfil, ativo, avatar, cartorio_id, setor_id }: UpdateUserDTO, @Param('id') id: string) {
        return this.userService.update({ nome, email, perfil, ativo, avatar, cartorio_id, setor_id }, id)
    }

    @Put(':id/senha')
    async update_senha(@Body() body: { senha: string }, @Param('id') id: string) {
        return this.userService.update_senha(id, body.senha)
    }
    @Delete(':id')
    async deleteUnic(@Param('id') id: string) {
        return this.userService.delete(id)
    }
}
