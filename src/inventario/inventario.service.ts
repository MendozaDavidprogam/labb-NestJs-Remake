import { Injectable, NotFoundException } from '@nestjs/common';
import { Inventario } from './entities/inventario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInventarioDto } from './dto/create-inventario';
import { UpdateInventarioDto } from './dto/update-productoORM.dto';
import { Producto } from 'src/producto/entities/producto.entity';
@Injectable()
export class InventarioService {

  constructor(
    @InjectRepository(Inventario) private inventarioRepo: Repository<Inventario>,
  ) {}

  findAll() { 
    return this.inventarioRepo.find(); 
  }

  findOne(id: number) { 
    return this.inventarioRepo.findOneBy({ id }); 
  }

  // Crear inventario sin asignar producto
  async crearInventario(dto: { nombre: string; existencias: number, estado: string}) {
    const inventario = this.inventarioRepo.create({
      nombre: dto.nombre,
      existencias: dto.existencias,
      estado: dto.estado ?? 'activo',
    });

    return await this.inventarioRepo.save(inventario);
  }

  async update(id: number, dto: UpdateInventarioDto) {
    const inventario = await this.inventarioRepo.findOneBy({ id });

    if (!inventario) {
      throw new NotFoundException('Inventario no encontrado');
    }

    Object.assign(inventario, dto);

    return await this.inventarioRepo.save(inventario);
  }

  async remove(id: number) { 
    const inventario = await this.inventarioRepo.findOneBy({ id });
    if (!inventario) {
      throw new NotFoundException('Inventario no encontrado');
    }

    await this.inventarioRepo.remove(inventario);
    return 'Inventario eliminado exitosamente';
  }
}
