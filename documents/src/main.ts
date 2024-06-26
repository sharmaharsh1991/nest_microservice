import { NestFactory } from '@nestjs/core';
import { DocumentModule } from './document.module';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.createMicroservice(DocumentModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: new ConfigService().get('port'),
    },
  } as TcpOptions);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
}
bootstrap();
