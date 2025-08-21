import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ProductoModule } from './producto/producto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { InventarioModule } from './inventario/inventario.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/user.entity';
import { Categoria } from './categoria/entities/categoria.entity';


@Module({ imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Yoelin26',
      database: 'proyectoAPI',
      entities: [Usuario, Categoria],
      synchronize: true,
    }),UsuarioModule, ProductoModule, CategoriaModule, InventarioModule, AuthModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
