import { Perfil } from "@prisma/client";
import { IsString, IsEmail, IsStrongPassword, IsEnum, IsOptional, ValidateNested, IsBoolean } from "class-validator";



export class CreateUserDTO {
  @IsString()
  nome: string;

  @IsEmail()
  email: string

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0
  })
  senha: string

  @IsEnum(Perfil)
  perfil: Perfil

  @IsString()
  @IsOptional()
  @ValidateNested({ each: true })
  cartorio_id: string

  @IsString()
  @IsOptional()
  @ValidateNested({ each: true })
  setor_id: string

  @IsEmail()
  avatar: string

  @IsBoolean()
  ativo: boolean
}