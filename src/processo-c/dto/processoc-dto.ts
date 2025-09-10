import { IsString, IsDate, IsOptional, IsArray, ValidateNested, IsNumber, IsEnum, IsBoolean } from "class-validator";
import { Type } from 'class-transformer';
import { DescricaoLoteDTO, DescricaoPessoaDTO } from "src/processo-p/dto/processop-dto";




export class CreateProcessocDTO {
    @IsString()
    num_processo: string

    @IsString()
    setor_id: string

    @IsString()
    atividade_id: string

    @IsString()
    tipo_id: string

    @IsString()
    observacao: string

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
