import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({example: 'Electrodomestico', description: 'Nombre de la categoria'})
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre: string;

  @ApiProperty({example: 'Aparatos electricos de hogar', description: 'Descripcion de la categoria'})
  @IsString({ message: 'La descripción debe ser un texto' })
  descripcion: string;
}

