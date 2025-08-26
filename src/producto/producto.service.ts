import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Inventario } from 'src/inventario/entities/inventario.entity';


@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,

    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,

    

  ) {}

  async findAll(categoriaId?: number) {
    if (categoriaId) {
      return this.productoRepo.find({
        where: { categoria: { id: categoriaId } },
      });
    }
    return this.productoRepo.find();
  }

  async findById(id: number) {
    const producto = await this.productoRepo.findOne({
      where: { id: id },
    });

    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  async create(dto: CreateProductoDto) {
    const categoria = await this.categoriaRepo.findOneBy({ id: dto.idcategoria });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    const producto = this.productoRepo.create({
      ...dto,
      categoria,
    });

    return await this.productoRepo.save(producto);
  }

  async update(id: number, dto: UpdateProductoDto) {
    const producto = await this.findById(id);

    if (dto.idcategoria) {
      const categoria = await this.categoriaRepo.findOneBy({ id: dto.idcategoria });
      if (!categoria) throw new NotFoundException('Categoría no encontrada');
      producto.categoria = categoria;
    }

    Object.assign(producto, dto);
    return await this.productoRepo.save(producto);
  }

  async remove(id: number) {
    const producto = await this.findById(id);
    return await this.productoRepo.remove(producto);
  }

}


