// src/categoria/categoria-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class CategoriaExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let mensaje = 'Error interno del servidor';
    let contexto = 'Error general en categorías';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      mensaje = exception.message;
      if (exception.name === 'BadRequestException') contexto = 'Error de validación de datos';
      if (exception.name === 'NotFoundException') contexto = 'Categoría no encontrada';
    } else if (exception instanceof Error) {
      mensaje = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      mensaje,
      timestamp: new Date().toISOString(),
      ruta: request.url,
      modulo: 'categoria',
      contexto,
    });
  }
}
