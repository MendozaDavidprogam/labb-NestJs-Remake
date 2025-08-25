import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateOperacionDto {
  @IsString()
  @IsNotEmpty()
  tipo: string;   //es de entrada o salida

  @IsString()
  @IsNotEmpty()
  concepto: string;  //compra, reposición, devolución, venta, consumo, pérdida, etc...

  @IsNumber()
  @IsPositive()
  cantidad: number;          

  @IsNumber()
  @IsPositive()
  productoId: number;  // Fk
}
