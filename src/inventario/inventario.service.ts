import { Injectable, NotFoundException } from '@nestjs/common';
import { Inventario } from './entities/inventario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInventarioDto } from './dto/create-inventario';
import { UpdateInventarioDto } from './dto/update-productoORM.dto';

@Injectable()
export class InventarioService {

    constructor(@InjectRepository(Inventario) private repo: Repository<Inventario>) {}


    findAll() { 
        return this.repo.find(); 
    }

    findOne(id: number) { 
        return this.repo.findOneBy({ id }); 
    }

    create(dto: CreateInventarioDto) { 
        return this.repo.save(dto); 
    }

    async update(id: number, dto: UpdateInventarioDto) {

        const inventario = await this.repo.findOneBy({ id });

        if (!inventario) {
            throw new NotFoundException('Inventario de Producto no encontrado');
        }

        // Aplica los cambios del DTO al inventario existente
        Object.assign(inventario, dto);

        // Guarda el inventario actualizado
        return await this.repo.save(inventario);
}

    async remove(id: number) { 
        const producto = await this.repo.findOneBy({ id });
        if (!producto) {
            throw new NotFoundException('Invenatrio de producto no encontrado');
        }

        await this.repo.remove(producto);
        return 'Invenatrio de producto eliminado exitosamente';
}















}
