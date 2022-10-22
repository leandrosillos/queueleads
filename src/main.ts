import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { configuration } from './config/configuration';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    methods: '*',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        {
          username: configuration.rabbitmq.user,
          password: configuration.rabbitmq.password,
          hostname: configuration.rabbitmq.host,
          port: configuration.rabbitmq.port,
          protocol: 'amqps',
        },
      ],
      queue: configuration.rabbitmq.queue,
    },
  });

  app.startAllMicroservices();

  await app.listen(3333);
}
bootstrap();
