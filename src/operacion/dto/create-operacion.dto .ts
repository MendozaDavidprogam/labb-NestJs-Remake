import { IsString, IsNumber, IsPositive, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOperacionDto {
  @ApiProperty({ example: 'entrada', description: 'Tipo de operación: entrada o salida' })
  @IsString()
  @IsNotEmpty({ message: 'El tipo no puede estar vacío' })
  @IsIn(['entrada', 'salida'], { message: 'Tipo debe ser "entrada" o "salida"' })
  tipo: string;

  @ApiProperty({ example: 'compra', description: 'Concepto de la operación' })
  @IsString()
  @IsNotEmpty({ message: 'El concepto no puede estar vacío' })
  concepto: string;

  @ApiProperty({ example: 10, description: 'Cantidad de productos a operar' })
  @IsNumber()
  @IsPositive({ message: 'La cantidad debe ser mayor que 0' })
  @IsNotEmpty({ message: 'La cantidad no puede estar vacía' })
  cantidad: number;

  @ApiProperty({ example: 1, description: 'ID del producto' })
  @IsNumber()
  @IsPositive({ message: 'El id del producto debe ser mayor que 0' })
  @IsNotEmpty({ message: 'El id del producto no puede estar vacío' })
  productoId: number;
}
