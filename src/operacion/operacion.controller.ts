import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { OperacionService } from './operacion.service';
import { GlobalExceptionFilter } from 'src/filters/filter-exception';

@UseFilters(GlobalExceptionFilter)
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
  @Get()
  async getAll() {
    return await this.operacionService.getAll();
  }

}
