// src/producto/producto.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { Producto } from './entities/producto.entity';
import { Categoria } from '../categoria/entities/categoria.entity'; // Importo la entidad Categoria

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Categoria]), // registramos Producto y Categoria
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService],
})
export class ProductoModule {}