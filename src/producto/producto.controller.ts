import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { GlobalExceptionFilter } from 'src/filters/filter-exception';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Producto } from './entities/producto.entity';
import { JwtAuthGuard } from 'src/auth/jwt-strategy/jwt-auth.guard';

@ApiTags('Productos')
@UseFilters(GlobalExceptionFilter)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Roles(Role.User, Role.Admin)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Listar todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos', type: [Producto] })
  async findAll(@Query('categoriaId') categoriaId?: number) {
    return await this.productoService.findAll(categoriaId);
  }

  @Roles(Role.User, Role.Admin)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Consultar producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: Producto })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.productoService.findById(id);
  }

  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto (solo admin)' })
  @ApiResponse({ status: 201, description: 'Producto creado', type: Producto })
  async create(@Body() dto: CreateProductoDto) {
    return await this.productoService.create(dto);
  }

  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar producto (solo admin)' })
  @ApiResponse({ status: 200, description: 'Producto actualizado', type: Producto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductoDto) {
    return await this.productoService.update(id, dto);
  }

  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar producto (solo admin)' })
  @ApiResponse({ status: 200, description: 'Producto eliminado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.productoService.remove(id);
  }
}
