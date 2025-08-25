// src/usuario/dto/update-usuario.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'David' })
  nombre?: string;

  @ApiPropertyOptional({ example: 'Mendoza' })
  apellido?: string;

  @ApiPropertyOptional({ example: 'admin123' })
  nombreusuario?: string;

  @ApiPropertyOptional({ example: 'admin@mail.com' })
  email?: string;

  @ApiPropertyOptional({ example: '123456' })
  contrasena?: string;

  @ApiPropertyOptional({ example: 'admin' })
  role?: string;

  @ApiPropertyOptional({ example: 'activo' })
  estado?: string;
}
