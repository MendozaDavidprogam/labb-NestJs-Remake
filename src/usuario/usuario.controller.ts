import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { UsuarioService } from './usuario.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsuarioExceptionFilter } from './filters/usuario-exception.filter/usuario-exception.filter';

@UseFilters(UsuarioExceptionFilter)
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Crear un usuario (registro abierto a todos)
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.usuarioService.create(dto);
  }

  // Listar todos los usuarios (solo admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return await this.usuarioService.findAll();
  }

  // Buscar usuario por ID (solo admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const usuario = await this.usuarioService.findById(id);
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }

  // Actualizar usuario (solo admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.usuarioService.update(id, dto);
  }

  // Eliminar usuario (solo admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usuarioService.remove(id);
  }

  //Buscar usuario por su email
@Get('email/:email')
  async findByEmail(@Param('email') email: string) {
     return await this.usuarioService.findByEmail(email);
   }

 
}