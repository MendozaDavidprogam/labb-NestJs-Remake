// src/usuario/usuario.controller.ts
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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { UsuarioService } from './usuario.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
<<<<<<< HEAD
import { UsuarioExceptionFilter } from './usuario-exception.filter/usuario-exception.filter';
import { Usuario } from './entities/user.entity';
=======
import { UsuarioExceptionFilter } from './filters/usuario-exception.filter/usuario-exception.filter';
>>>>>>> d7130203386b29efe6574bd489e3ed80439b1a46

@UseFilters(UsuarioExceptionFilter)
@ApiTags('Usuarios') // Sección en Swagger
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: Usuario })
  async create(@Body() dto: CreateUserDto) {
    return await this.usuarioService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos los usuarios (solo admin)' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [Usuario] })
  @Get()
  async findAll() {
    return await this.usuarioService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar usuario por ID (solo admin)' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: Usuario })
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const usuario = await this.usuarioService.findById(id);
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar usuario (solo admin)' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado', type: Usuario })
  @Put(':id')
<<<<<<< HEAD
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return await this.usuarioService.updateUser(id, dto);
=======
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.usuarioService.update(id, dto);
>>>>>>> d7130203386b29efe6574bd489e3ed80439b1a46
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar usuario (solo admin)' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usuarioService.remove(id);
  }
<<<<<<< HEAD
}
=======

  //Buscar usuario por su email
@Get('email/:email')
  async findByEmail(@Param('email') email: string) {
     return await this.usuarioService.findByEmail(email);
   }

 
}
>>>>>>> d7130203386b29efe6574bd489e3ed80439b1a46
