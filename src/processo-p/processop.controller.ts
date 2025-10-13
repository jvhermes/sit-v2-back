import { Controller, Body, Get, Post, Put, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { CreateProcessopDTO, RespondeLoteDTO, RespondePessoaDTO } from './dto/processop-dto';
import { ProcessopService } from './processop.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('processop')
export class ProcessopController {

    constructor(private readonly processopService: ProcessopService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() { ano, atividade_id, texto, cartorio_id, num_processo, prazo, tipo_id, descricao_lote, descricao_pessoa, lotes_id }: CreateProcessopDTO, @Req() req) {
        const setor_id = req.user.setor_id
        return this.processopService.create({ ano, atividade_id, texto, cartorio_id, num_processo, prazo, tipo_id, descricao_lote, descricao_pessoa, lotes_id }, setor_id)
    }

    @Post('responde-lote')
    async responde_lote(@Body() { alvara, descricao, texto, processo_id, processo_status, data }: RespondeLoteDTO) {
        return this.processopService.responde_lote({ alvara, descricao, texto, processo_id, processo_status, data })
    }
    @Post('responde-pessoa')
    async responde_pessoa(@Body() { alvara, texto, processo_id, processo_status, data }: RespondePessoaDTO) {
        return this.processopService.responde_pessoa({ alvara, texto, processo_id, processo_status, data })
    }


    @Put(':id/close')
    async update(@Body() body: { conclusao: string }, @Param("id") id: string) {
        return this.processopService.close(parseInt(id), body.conclusao)
    }

    @Get(':id')
    async get_one(@Param("id") id: string) {
        return this.processopService.get_one(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async get(@Req() req) {
        const ativo = true
        const perfil = req.user.perfil
        const setor_id = req.user.setor_id
        const cartorio_id = req.user.cartorio_id

        return this.processopService.get({ ativo, perfil,setor_id,cartorio_id  })
    }

    @Get('/inativo')

    async get_inativo(@Req() req) {
        const ativo = false
        const perfil = req.user.perfil
        const setor_id = req.user.setor_id
        const cartorio_id = req.user.cartorio_id

        return this.processopService.get({ ativo, perfil,setor_id,cartorio_id })
    }

    @Delete(':id')
    async delete(@Param("id") id: string) {
        return this.processopService.delete(parseInt(id))
    }
}