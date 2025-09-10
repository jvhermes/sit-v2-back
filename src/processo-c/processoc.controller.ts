import { Controller, Body, Get, Post, Put, Delete, Param, Req, UseGuards, } from '@nestjs/common';
import { ProcessocService } from './processoc.service';
import { CreateProcessocDTO } from './dto/processoc-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('processoc')
export class ProcessocController {

    constructor(private readonly processocService: ProcessocService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() { ano, atividade_id, setor_id, num_processo, tipo_id, descricao_lote, descricao_pessoa, lotes_id, observacao }: CreateProcessocDTO, @Req() req) {
        const cartorio_id = req.user.cartorio_id
        return this.processocService.create({ ano, atividade_id, setor_id, num_processo, tipo_id, descricao_lote, descricao_pessoa, lotes_id, observacao }, cartorio_id)
    }

    @Put(':id/close')
    async update(@Param("id") id: string) {
        return this.processocService.close(parseInt(id))
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async get(@Req() req) {
        const ativo = true
        const perfil = req.user.perfil
        const setor_id = req.user.setor_id
        const cartorio_id = req.user.cartorio_id

        return this.processocService.get({ perfil, ativo,setor_id,cartorio_id  })
    }

    @Get(':id')
    async get_one(@Param("id") id: string) {
        return this.processocService.get_one(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/inativo')
    async get_inativo(@Req() req) {
        const ativo = false
        const perfil = req.user.perfil
        const setor_id = req.user.setor_id
        const cartorio_id = req.user.cartorio_id

        return this.processocService.get({ perfil, ativo,setor_id,cartorio_id  })
    }
    @Delete(':id')
    async delete(@Param("id") id: string) {
        return this.processocService.delete(parseInt(id))
    }
}