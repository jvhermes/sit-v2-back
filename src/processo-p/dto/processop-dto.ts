import { IsString, IsDate, IsOptional, IsArray, ValidateNested, IsNumber, IsEnum, IsBoolean } from "class-validator";
import { Type } from 'class-transformer';
import { Perfil, Status } from "@prisma/client";


export class DescricaoLoteDTO {
    @IsString()
    lote: string

    @IsString()
    area: string

    @IsString()
    testada: string
}

export class DescricaoRespostaDTO {
    @IsString()
    matricula: string

    @IsString()
    data_registro: string

    @IsString()
    transcricao: string

    @IsString()
    lote: string

    @IsString()
    descricao_id: string
}

export class DescricaoPessoaDTO {
    @IsString()
    nome: string

    @IsString()
    telefone: string

    @IsString()
    cpf: string

    @IsString()
    email: string
}

export class CreateProcessopDTO {
    @IsString()
    num_processo: string

    @IsDate()
    prazo: Date

    @IsString()
    cartorio_id: string

    @IsString()
    atividade_id: string

    @IsString()
    tipo_id: string

    @IsString()
    texto: string

    @IsString()
    ano: string

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DescricaoLoteDTO)
    descricao_lote?: DescricaoLoteDTO[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DescricaoPessoaDTO)
    descricao_pessoa?: DescricaoPessoaDTO[];

    @IsArray()
    @IsNumber()
    @ValidateNested({ each: true })
    lotes_id: number[];
}

export class CloseProcessopDTO {

    @IsNumber()
    id: number

    @IsString()
    conclusao: string

}

export class GetProcessoPDTO{

    perfil:Perfil

    @IsBoolean()
    ativo:boolean

    @IsString()
    cartorio_id:string
    
    @IsString()
    setor_id:string
}


export class RespondePessoaDTO {
    @IsNumber()
    processo_id: number

    @IsDate()
    data: Date


    @IsString()
    @IsOptional()
    @ValidateNested({ each: true })
    alvara: string

    @IsString()
    texto: string

    processo_status: Status
}

export class RespondeLoteDTO {

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DescricaoRespostaDTO)
    descricao: DescricaoRespostaDTO[];

    @IsString()
    texto: string

    @IsNumber()
    processo_id: number

    @IsDate()
    data: Date


    @IsString()
    @IsOptional()
    @ValidateNested({ each: true })
    alvara: string

    processo_status: Status

}