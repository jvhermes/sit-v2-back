import { IsString,IsEmail,IsStrongPassword,IsEnum } from "class-validator";

enum Perfil {ADMIN = "ADMIN",
  PREFEITURA = "PREFEITURA",
  CARTORIO = "CARTORIO"}

export class CreateUserDTO{
    @IsString()
    name:string;

    @IsEmail()
    email:string

    @IsStrongPassword({
        minLength:3,
        minLowercase:0,
        minUppercase:0,
        minNumbers:0,
        minSymbols:0
    })
    password:string

    @IsEnum(Perfil)
    perfil:Perfil

}