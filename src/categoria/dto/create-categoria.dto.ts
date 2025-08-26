import {IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsString()
  @MinLength(3)
  descripcion: string;
}