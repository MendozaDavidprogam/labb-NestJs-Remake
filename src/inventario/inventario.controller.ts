import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseFilters } from '@nestjs/common';
import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from 'src/producto/entities/producto.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InventarioService } from './inventario.service';
import { Inventario } from './entities/inventario.entity';
import { CreateInventarioDto } from './dto/create-inventario';
import { GlobalExceptionFilter } from 'src/filters/filter-exception';

@UseFilters(GlobalExceptionFilter)
@Controller('inventario')
export class InventarioController {
  constructor(private readonly InventarioService: InventarioService) {}
  

  // Listar todos los inventarios (solo admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return await this.InventarioService.findAll();
  }


  // Crear un usuario (solo admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() dto: CreateInventarioDto) {
    return await this.InventarioService.crearInventario(dto);
  }


  // Buscar inventario por ID (solo admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const inventario = await this.InventarioService.findOne(id);
    if (!inventario) throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    return inventario;
  }

  // Eliminar inventario (solo admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.InventarioService.remove(id);
  }



  

}








