import { Body, Controller, Get, Post, UseFilters, UseGuards } from '@nestjs/common';
import { OperacionService } from './operacion.service';
import { GlobalExceptionFilter } from 'src/filters/filter-exception';
import { JwtAuthGuard } from 'src/auth/jwt-strategy/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';

@UseFilters(GlobalExceptionFilter)
@UseGuards(JwtAuthGuard, RolesGuard)


@Controller('operacion')
export class OperacionController {
    constructor(private readonly operacionService: OperacionService) {}

  // Registrar operación (entrada/salida)
  @Post()
  async operar(
    @Body() dto: { tipo: string; concepto: string; cantidad: number; productoId: number },
  ) {
    return await this.operacionService.operar(dto);
  }

  // Listar todas las operaciones (solo admin)
  @Roles(Role.Admin)
  @Get()
  async getAll() {
    return await this.operacionService.getAll();
  }

}
