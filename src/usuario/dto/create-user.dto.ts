// src/usuario/dto/create-usuario.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'David', description: 'Nombre del usuario' })
  nombre: string;

  @ApiProperty({ example: 'Mendoza', description: 'Apellido del usuario' })
  apellido: string;

  @ApiProperty({ example: 'admin123', description: 'Nombre de usuario único' })
  nombreusuario: string;

  @ApiProperty({ example: 'admin@mail.com', description: 'Correo electrónico' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Contraseña en texto plano' })
  contrasena: string;

  @ApiProperty({ example: 'admin', description: 'Rol del usuario (user/admin)', required: false })
  role?: string;
}
