"/src/categoria/dto/create-categoria.dto.ts"
import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nombre unico de la categoria',
    example: 'Electronica',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  nombre: string;

  @ApiProperty({
    description: 'Descripcion breve de la categoria',
    example: 'Productos relacionados con tecnologia',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  descripcion: string;
}
