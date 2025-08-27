// src/producto/dto/create-producto.dto.ts
import { IsString, IsNumber, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({ example: 'Laptop', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @ApiProperty({ example: 1500, description: 'Precio del producto' })
  @IsNumber()
  @IsNotEmpty({ message: 'El precio no puede estar vacío' })
  precio: number;

  @ApiProperty({ example: true, description: 'Disponibilidad del producto' })
  @IsBoolean()
  disponibilidad: boolean;

  @ApiProperty({ example: 'activo', description: 'Estado del producto' })
  @IsString()
  @IsNotEmpty({ message: 'El estado no puede estar vacío' })
  estado: string;

  @ApiProperty({ example: 1, description: 'ID de la categoría' })
  @IsNumber()
  @IsNotEmpty({ message: 'El id de la categoría no puede estar vacío' })
  idcategoria: number;

  @ApiProperty({ example: 1, description: 'ID del inventario' })
  @IsNumber()
  @IsNotEmpty({ message: 'El id del inventario no puede estar vacío' })
  idinventario: number;
}
