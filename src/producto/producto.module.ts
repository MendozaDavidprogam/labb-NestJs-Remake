import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { Producto } from './entities/producto.entity';
import { Categoria } from '../categoria/entities/categoria.entity'; 
import { Inventario } from 'src/inventario/entities/inventario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Categoria, Inventario]),
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService],
})
export class ProductoModule {}