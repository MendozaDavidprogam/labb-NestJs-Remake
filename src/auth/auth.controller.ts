import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // login con correo y contraseña
  @Post('login')
  async login(@Body() body: { email: string; contrasena: string }) {
    const user = await this.authService.validateUser(body.email, body.contrasena);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    return this.authService.login(user);
  }
}
