// src/categoria/dto/create-categoria.dto.ts
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nombre único de la categoría',
    example: 'Electrónica',
    minLength: 3,
  })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre: string;

  @ApiProperty({
    description: 'Descripción breve de la categoría',
    example: 'Productos relacionados con tecnología',
    minLength: 3,
  })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @IsString({ message: 'La descripción debe ser un texto' })
  @MinLength(3, { message: 'La descripción debe tener al menos 3 caracteres' })
  descripcion: string;
}
