import { PartialType } from '@nestjs/mapped-types';
import { CreateInventarioDto } from './create-inventario';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateInventarioDto extends PartialType(CreateInventarioDto) {
  @ApiPropertyOptional({ description: 'Nombre del inventario', example: 'Almacén Secundario' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ description: 'Cantidad de existencias', example: 50 })
  @IsOptional()
  @IsNumber()
  existencias?: number;

  @ApiPropertyOptional({ description: 'Estado del inventario', example: 'inactivo', enum: ['activo', 'inactivo'] })
  @IsOptional()
  @IsString()
  @IsIn(['activo', 'inactivo'], { message: 'Estado debe ser "activo" o "inactivo"' })
  estado?: string;
}
