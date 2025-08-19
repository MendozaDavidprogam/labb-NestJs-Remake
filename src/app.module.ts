import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ProductoModule } from './producto/producto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { InventarioModule } from './inventario/inventario.module';
import { RolesModule } from './roles/roles.module';

@Module({ imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456789',
      database: 'proyectoAPI',
      entities: [],
      synchronize: true,
    }),UsuarioModule, ProductoModule, CategoriaModule, InventarioModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
