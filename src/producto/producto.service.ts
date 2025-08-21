import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  async findAll(categoriaId?: number) {
    if (categoriaId) {
      return this.productoRepo.find({ where: { idcategoria: categoriaId } });
    }
    return this.productoRepo.find();
  }

  async findById(id: number) {
    const producto = await this.productoRepo.findOneBy({ idproducto: id });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  async create(dto: CreateProductoDto) {
    const producto = this.productoRepo.create(dto);
    return await this.productoRepo.save(producto);
  }

  async update(id: number, dto: UpdateProductoDto) {
    const producto = await this.findById(id);
    Object.assign(producto, dto);
    return await this.productoRepo.save(producto);
  }

  async remove(id: number) {
    const producto = await this.findById(id);
    return await this.productoRepo.remove(producto);
  }
}
