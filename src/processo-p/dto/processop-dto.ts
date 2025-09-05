import { IsString, IsDate, IsObject, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

export class DescricaoLoteDTO {
    @IsString()

    lote: string
    @IsString()

    area: string
    @IsString()

    testada: string
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
    @IsString({ each: true }) 
    lotes_id: string[];
}