"/src/usuario/usuario-exception.filter/usuario-exception.filter.ts"
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException, BadRequestException)
export class UsuarioExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let contexto = 'Error general en usuarios';

    if (exception instanceof BadRequestException) {
      contexto = 'Validación exitosa de datos';
    } else if (exception instanceof NotFoundException) {
      contexto = 'Recurso no encontrado';
    }

    response.status(status).json({
      statusCode: status,
      mensaje: exception.message,
      timestamp: new Date().toISOString(), 
      ruta: request.url,
      modulo: 'users',
      contexto,
    });
  }
}