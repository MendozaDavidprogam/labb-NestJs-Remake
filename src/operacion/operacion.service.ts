// src/operacion/operacion.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from 'src/inventario/entities/inventario.entity';
import { Operacion } from './entities/operacion.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import { CreateOperacionDto } from './dto/create-operacion.dto ';

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

  // Registrar entrada o salida con control de stock y alertas
  async operar(dto: CreateOperacionDto) {
    const producto = await this.productoRepo.findOne({
      where: { id: dto.productoId },
      relations: ['inventario', 'categoria'],
    });

    if (!producto) throw new NotFoundException(`Producto con ID ${dto.productoId} no encontrado`);
    if (!producto.inventario) throw new NotFoundException('El producto no tiene inventario asignado');

    const inventario = producto.inventario;

    // Control de stock y reglas por categoría
    if (dto.tipo === 'entrada') {
      inventario.existencias += dto.cantidad;
    } else if (dto.tipo === 'salida') {
      if (inventario.existencias < dto.cantidad) {
        throw new BadRequestException('No hay suficientes productos en el inventario');
      }

      // Regla para medicamentos
      if (producto.categoria?.nombre.toLowerCase() === 'medicamento' && dto.cantidad > 10) {
        throw new BadRequestException('No se puede retirar más de 10 unidades de medicamentos a la vez');
      }

      inventario.existencias -= dto.cantidad;
    } else {
      throw new BadRequestException('Tipo inválido, debe ser "entrada" o "salida"');
    }


    await this.inventarioRepo.save(inventario);


    const operacion = this.operacionRepo.create({
      tipo: dto.tipo,
      concepto: dto.concepto,
      cantidad: dto.cantidad,
      producto,
    });
    const savedOperacion = await this.operacionRepo.save(operacion);

    //         ALERTAS DE STOCK MINIMO
    const categoriasCriticas = ['medicina', 'medicamento', 'alimento'];
    let alerta: string | null = null;

    if (inventario.existencias <= 10) {
      alerta = `ALERTA: Quedan solo ${inventario.existencias} unidades de "${producto.nombre}" en inventario`;
      if (categoriasCriticas.includes(producto.categoria?.nombre.toLowerCase())) {
        alerta += ' - Reponer inmediatamente (Categoría crítica)';
      }
      console.warn(alerta);
    }


    return alerta ? { operacion: savedOperacion, alerta } : savedOperacion;
  }

  // Listar todas las operaciones (solo admin)
  async getAll() {
    return await this.operacionRepo.find({
      relations: ['producto'],
      order: { fecha: 'DESC' },
    });
  }
}
