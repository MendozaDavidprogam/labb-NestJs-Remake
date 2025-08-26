// src/categories/dto/update-category.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
  @ApiPropertyOptional({
    description: 'Nombre unico de la categoria',
    example: 'Electrodomésticos',
    minLength: 3,
  })
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Descripcion breve de la categoria',
    example: 'Productos para el hogar',
    minLength: 3,
  })
  descripcion?: string;
}
