import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { JwtAuthGuard } from 'src/auth/jwt-strategy/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';

@Controller('categoria')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  // Crear categoría (solo admin)
  @Post()
  @Roles(Role.Admin)
  create(@Body() dto: CreateCategoriaDto) {
    return this.categoriaService.create(dto);
  }

  // Obtener todas las categorías (user/admin)
  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  // Obtener categoría por id (user/admin)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.findOne(id);
  }

  // Actualizar parcialmente (PATCH) categoría (solo admin)
  @Patch(':id')
  @Roles(Role.Admin)
  updatePatch(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(id, dto);
  }

  // Reemplazar completamente (PUT) categoría (solo admin)
  @Put(':id')
  @Roles(Role.Admin)
  updatePut(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(id, dto);
  }

  // Eliminar categoría (solo admin)
  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.remove(id);
  }
}
