import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseFilters, Put } from '@nestjs/common';
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
import { CreateInventarioDto } from './dto/create-inventario';
import { GlobalExceptionFilter } from 'src/filter/filter-exception';
import { JwtAuthGuard } from 'src/auth/jwt-strategy/jwt-auth.guard';
import { UpdateInventarioDto } from './dto/update-productoORM.dto';

@UseFilters(GlobalExceptionFilter)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('inventario')
export class InventarioController {
  constructor(private readonly InventarioService: InventarioService) {}
  

  // Listar todos los inventarios (solo admin)
  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return await this.InventarioService.findAll();
  }


  // Crear un inventario (solo admin)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() dto: CreateInventarioDto) {
    return await this.InventarioService.crearInventario(dto);
  }


  // Buscar inventario por ID (solo admin)
  @Roles(Role.Admin)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const inventario = await this.InventarioService.findOne(id);
    if (!inventario) throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    return inventario;
  }

  // Eliminar inventario (solo admin)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.InventarioService.remove(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  updatePut(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInventarioDto,
   ) {
    return this.InventarioService.update(id, dto);
  }
}