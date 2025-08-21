import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], // <-- Esto es clave
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService], // opcional, si otro módulo lo necesita
})
export class UsuarioModule {}
