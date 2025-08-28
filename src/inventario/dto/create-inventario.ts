import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateInventarioDto{
    
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @IsString() 
    nombre: string

    @IsNotEmpty({ message: 'Existencias no puede estar vacío' })
    @IsNumber() 
    existencias: number

    @IsOptional()
    @IsString()
    @IsIn(['activo', 'inactivo'], { message: 'Estado debe ser "activo" o "inactivo"' })
    estado?: string;

}
