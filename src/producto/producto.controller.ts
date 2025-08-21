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
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';

@Controller('producto')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // Consultar todos los productos (user/admin)
  @Roles(Role.User, Role.Admin)
  @Get()
  async findAll(@Query('categoriaId') categoriaId?: number) {
    return await this.productoService.findAll(categoriaId);
  }

  // Consultar por id (user/admin)
  @Roles(Role.User, Role.Admin)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.productoService.findById(id);
  }

  // Crear producto (solo admin)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() dto: CreateProductoDto) {
    return await this.productoService.create(dto);
  }

  // Actualizar producto (solo admin)
  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductoDto,
  ) {
    return await this.productoService.update(id, dto);
  }

  // Eliminar producto (solo admin)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.productoService.remove(id);
  }
}