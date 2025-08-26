import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateInventarioDto{
    
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsNumber() 
    existencias: number





}
