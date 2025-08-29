import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let mensaje: any;

    const res = exception.getResponse();
    if (typeof res === 'object' && res['message']) {
        //mensajes del dto
      mensaje = res['message']; 
    } else {
      mensaje = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      mensaje,
      timestamp: new Date().toISOString(),
      ruta: request.url,
    });
  }
}