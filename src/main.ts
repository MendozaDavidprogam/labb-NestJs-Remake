// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
<<<<<<< HEAD
import { UsuarioExceptionFilter } from './usuario/usuario-exception.filter/usuario-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
=======
import { UsuarioExceptionFilter } from './usuario/filters/usuario-exception.filter/usuario-exception.filter';

>>>>>>> d7130203386b29efe6574bd489e3ed80439b1a46

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipes globales
  app.useGlobalPipes(new ValidationPipe());

  // Filtros globales
  app.useGlobalFilters(new UsuarioExceptionFilter());

  // Swagger Configuracion basica
  const config = new DocumentBuilder()
    .setTitle('Inventario API')
    .setDescription('API para gestionar productos, usuarios y categorías')
    .setVersion('1.0')
    .addBearerAuth() // Habilita JWT en Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
