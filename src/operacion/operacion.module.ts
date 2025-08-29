import { Module } from '@nestjs/common';
import { OperacionController } from './operacion.controller';
import { OperacionService } from './operacion.service';
import { Operacion } from './entities/operacion.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventario } from 'src/inventario/entities/inventario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Operacion, Producto, Inventario])],
  controllers: [OperacionController],
  providers: [OperacionService],
  exports: [OperacionService],
})
export class OperacionModule {}