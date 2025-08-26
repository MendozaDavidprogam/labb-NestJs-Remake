import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString()
  nombre: string;

  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })  @IsString()
  apellido: string;

  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })  @IsString()
  nombreusuario: string;

  @IsEmail({}, { message: 'El correo no es válido' })
  @IsNotEmpty({ message: 'El correo no puede estar vacío' })
  email: string;

  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  contrasena: string;

  role?: string;

}
