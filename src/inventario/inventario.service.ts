import { Injectable, NotFoundException } from '@nestjs/common';
import { Inventario } from './entities/inventario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInventarioDto } from './dto/create-inventario';
import { UpdateInventarioDto } from './dto/update-productoORM.dto';
import { ProductoService } from 'src/producto/producto.service';
import { Producto } from 'src/producto/entities/producto.entity';

@Injectable()
export class InventarioService {

  constructor(
    @InjectRepository(Inventario) private inventarioRepo: Repository<Inventario>,
    @InjectRepository(Producto) private productoRepo: Repository<Producto>,
  ) {}

  
    findAll() { 
        return this.inventarioRepo.find(); 
    }

    findOne(id: number) { 
        return this.inventarioRepo.findOneBy({ id }); 
    }


    async crearInventario(dto: { existencias: number; idproducto: number }) {
    const producto = await this.productoRepo.findOneBy({ id: dto.idproducto });
    if (!producto) {
        throw new Error(`El producto con ID ${dto.idproducto} no existe`);
    }

    const inventario = this.inventarioRepo.create({
        existencias: dto.existencias, 
        producto,
    });

    return await this.inventarioRepo.save(inventario);
}



    async update(id: number, dto: UpdateInventarioDto) {

        const inventario = await this.inventarioRepo.findOneBy({ id });

        if (!inventario) {
            throw new NotFoundException('Inventario de Producto no encontrado');
        }

        // Aplica los cambios del DTO al inventario existente
        Object.assign(inventario, dto);

        // Guarda el inventario actualizado
        return await this.inventarioRepo.save(inventario);
}

    async remove(id: number) { 
        const producto = await this.inventarioRepo.findOneBy({ id });
        if (!producto) {
            throw new NotFoundException('Invenatrio de producto no encontrado');
        }

        await this.inventarioRepo.remove(producto);
        return 'Invenatrio de producto eliminado exitosamente';
}



}
