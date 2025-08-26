// src/categories/dto/update-category.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
  @ApiPropertyOptional({
    description: 'Nombre único de la categoría',
    example: 'Electrodomésticos',
    minLength: 3,
  })
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Descripción breve de la categoría',
    example: 'Productos para el hogar',
    minLength: 3,
  })
  descripcion?: string;
}
