import { IsString, IsNumber, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsNumber()
  @IsNotEmpty({ message: 'El precio no puede estar vacío' })
  precio: number;

  @IsBoolean()
  disponibilidad: boolean;

  @IsString()
  estado: string;

  @IsNumber()
  @IsNotEmpty({ message: 'El id de la categoría no puede estar vacío' })
  idcategoria: number; 
  
  @IsNumber()
  @IsNotEmpty({ message: 'El id del no puede estar vacío' })
  idinventario: number; 
}
