// src/categories/dto/update-category.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
  @ApiPropertyOptional({
    description: 'Nombre único de la categoría',
    example: 'Electrodomésticos',
    minLength: 3,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'El nombre no puede estar vacio si se envia' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Descripcion breve de la categoria',
    example: 'Productos para el hogar',
    minLength: 3,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'La descripcion no puede estar vacía si se envia' })
  @IsString({ message: 'La descripcion debe ser un texto' })
  @MinLength(3, { message: 'La descripcion debe tener al menos 3 caracteres' })
  descripcion?: string;
}
