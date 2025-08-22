"/src/categoria/dto/create-categoria.dto.ts"
import { IsString, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsString()
  @MinLength(3)
  descripcion: string;
}