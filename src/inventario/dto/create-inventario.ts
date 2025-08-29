import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInventarioDto {
  @ApiProperty({
    description: 'Nombre del inventario',
    example: 'Almacén Central',
  })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Cantidad de existencias',
    example: 100,
  })
  @IsNotEmpty({ message: 'Existencias no puede estar vacío' })
  @IsNumber()
  existencias: number;

  @ApiPropertyOptional({
    description: 'Estado del inventario',
    example: 'activo',
    enum: ['activo', 'inactivo'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['activo', 'inactivo'], { message: 'Estado debe ser "activo" o "inactivo"' })
  estado?: string;
}
