import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dto/create-inventario';
import { UpdateInventarioDto } from './dto/update-productoORM.dto';
import { JwtAuthGuard } from 'src/auth/jwt-strategy/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { GlobalExceptionFilter } from 'src/filters/filter-exception';


import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@UseFilters(GlobalExceptionFilter)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('inventario')
@ApiBearerAuth()
@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  // Listar todos los inventarios (solo admin)
  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Listar todos los inventarios (solo admin)' })
  @ApiResponse({ status: 200, description: 'Lista de inventarios devuelta' })
  findAll() {
    return this.inventarioService.findAll();
  }

  // Crear un inventario (solo admin)
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Crear un nuevo inventario (solo admin)' })
  @ApiResponse({ status: 201, description: 'Inventario creado correctamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado (solo admin)' })
  create(@Body() dto: CreateInventarioDto) {
    return this.inventarioService.crearInventario(dto);
  }

  // Buscar inventario por ID (solo admin)
  @Get(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Obtener inventario por ID (solo admin)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Inventario encontrado' })
  @ApiResponse({ status: 404, description: 'Inventario no encontrado' })
  findById(@Param('id', ParseIntPipe) id: number) {
    const inventario = this.inventarioService.findOne(id);
    if (!inventario) throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    return inventario;
  }

  // Actualizar inventario (solo admin)
  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Actualizar inventario (solo admin)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Inventario actualizado' })
  @ApiResponse({ status: 404, description: 'Inventario no encontrado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateInventarioDto) {
    return this.inventarioService.update(id, dto);
  }

  // Eliminar inventario (solo admin)
  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Eliminar inventario (solo admin)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Inventario eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Inventario no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inventarioService.remove(id);
  }
}
