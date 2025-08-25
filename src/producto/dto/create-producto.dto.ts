// src/producto/dto/create-producto.dto.ts
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsBoolean()
  disponibilidad: boolean;

  @IsString()
  estado: string;

  @IsNumber()
  idcategoria: number; 
}
