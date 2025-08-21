// src/producto/producto.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { Producto } from './entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto]), // <-- Registramos la entidad Producto
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService],
})
export class ProductoModule {}
