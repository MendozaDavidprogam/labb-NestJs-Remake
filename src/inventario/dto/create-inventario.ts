import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateInventarioDto{
    
    @IsNotEmpty() 
    @IsNumber() 
    existencias: number

    @IsNotEmpty() 
    @IsNumber() 
    idproducto: number



}
