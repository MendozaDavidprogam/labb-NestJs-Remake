import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventario } from 'src/inventario/entities/inventario.entity';
import { Operacion } from './entities/operacion.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OperacionService {
      constructor(

        @InjectRepository(Operacion)
        private operacionRepo: Repository<Operacion>,

        @InjectRepository(Inventario)
        private inventarioRepo: Repository<Inventario>,

        @InjectRepository(Producto)
        private productoRepo: Repository<Producto>,

        
     
     ) {}

      //registrar una operación (entrada/salida)
    async operar(dto: { tipo: string; concepto: string; cantidad: number; productoId: number }) {
      const producto = await this.productoRepo.findOne({
        where: { id: dto.productoId },
        relations: ['inventario'],
      });

    if (!producto) throw new NotFoundException(`Producto con ID ${dto.productoId} no encontrado`);
    if (!producto.inventario) throw new NotFoundException('El producto no tiene inventario asignado');

    const inventario = producto.inventario;

    // Actualizar existencias según tipo
    if (dto.tipo === 'entrada') {
      inventario.existencias += dto.cantidad;
    } else if (dto.tipo === 'salida') {
      if (inventario.existencias < dto.cantidad) {
        throw new BadRequestException('No hay suficientes productos en el inventario');
      }
      inventario.existencias -= dto.cantidad;
    } else {
      throw new BadRequestException('Tipo inválido, debe ser "entrada" o "salida"');
    }

    // Guardar cambios en inventario
    await this.inventarioRepo.save(inventario);

    // Registrar operación
    const operacion = this.operacionRepo.create({
      tipo: dto.tipo,
      concepto: dto.concepto,
      cantidad: dto.cantidad,
      producto,
    });

    return await this.operacionRepo.save(operacion);
  }

  // listar todas las operaciones (admin)
  async getAll() {
    return await this.operacionRepo.find({
      relations: ['producto'],
      order: { fecha: 'DESC' },
    });
  }
}
