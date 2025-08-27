// src/usuario/dto/create-usuario.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'David', description: 'Nombre del usuario' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Mendoza', description: 'Apellido del usuario' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  @IsString()
  apellido: string;

  @ApiProperty({ example: 'admin123', description: 'Nombre de usuario único' })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
  @IsString()
  nombreusuario: string;

  @ApiProperty({ example: 'admin@mail.com', description: 'Correo electrónico' })
  @IsEmail({}, { message: 'El correo no es válido' })
  @IsNotEmpty({ message: 'El correo no puede estar vacío' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Contraseña en texto plano' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contrasena: string;

  @ApiProperty({
    example: 'admin',
    description: 'Rol del usuario (user/admin)',
    required: false,
  })
  @IsString()
  role?: string;
}
