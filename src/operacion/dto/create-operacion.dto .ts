import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateOperacionDto {
  @IsString()
  @IsNotEmpty({ message: 'El tipo no puede estar vacío' })
  tipo: string;   //es de entrada o salida

  @IsString()
  @IsNotEmpty({ message: 'El concepto no puede estar vacío' })
  concepto: string;  //compra, reposición, devolución, venta, consumo, pérdida, etc...

  @IsNumber()
  @IsNotEmpty({ message: 'cantidad no puede estar vacío' })
  @IsPositive()
  cantidad: number;          

  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'El id del producto no puede estar vacío, tiene que agregar algún producto para realizar una operación' })
  productoId: number;  // Fk
}
