"/src/categoria/dto/create-categoria.dto.ts"
import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nombre único de la categoría',
    example: 'Electrónica',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  nombre: string;

  @ApiProperty({
    description: 'Descripción breve de la categoría',
    example: 'Productos relacionados con tecnología',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  descripcion: string;
}
