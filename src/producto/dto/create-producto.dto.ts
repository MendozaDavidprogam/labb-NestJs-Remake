import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsBoolean()
  disponibilidad: boolean;

  @IsOptional()
  idcategoria?: number;

  @IsOptional()
  idinventario?: number;

  @IsString()
  estado: string;
}
