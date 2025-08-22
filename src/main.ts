import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UsuarioExceptionFilter } from './usuario/filters/usuario-exception.filter/usuario-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe);
  app.useGlobalFilters(new UsuarioExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
