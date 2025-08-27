// src/producto/dto/update-producto.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
  @ApiPropertyOptional({ example: 'Laptop', description: 'Nombre del producto' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ example: 1500, description: 'Precio del producto' })
  @IsOptional()
  @IsNumber()
  precio?: number;

  @ApiPropertyOptional({ example: true, description: 'Disponibilidad del producto' })
  @IsOptional()
  @IsBoolean()
  disponibilidad?: boolean;

  @ApiPropertyOptional({ example: 'activo', description: 'Estado del producto' })
  @IsOptional()
  @IsString()
  estado?: string;

}
