// src/operacion/operacion.controller.ts
import { Body, Controller, Get, Post, UseFilters, UseGuards } from '@nestjs/common';
import { OperacionService } from './operacion.service';
import { GlobalExceptionFilter } from 'src/filters/filter-exception';
import { JwtAuthGuard } from 'src/auth/jwt-strategy/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOperacionDto } from './dto/create-operacion.dto ';
import { Operacion } from './entities/operacion.entity';

@ApiTags('Operaciones')
@UseFilters(GlobalExceptionFilter)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('operacion')
export class OperacionController {
  constructor(private readonly operacionService: OperacionService) {}

  @ApiOperation({ summary: 'Registrar una operación de entrada o salida' })
  @ApiResponse({ status: 201, description: 'Operación registrada exitosamente', type: Operacion })
  @ApiBearerAuth()
  @Post()
  async operar(@Body() dto: CreateOperacionDto) {
    return await this.operacionService.operar(dto);
  }

  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Listar todas las operaciones (solo admin)' })
  @ApiResponse({ status: 200, description: 'Lista de operaciones', type: [Operacion] })
  @ApiBearerAuth()
  @Get()
  async getAll() {
    return await this.operacionService.getAll();
  }
}
