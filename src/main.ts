import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${configService.get('RABBIT_MQ_HOST')}:${configService.get(
          'RABBIT_MQ_PORT',
        )}`,
      ],
      queue: configService.get('RABBIT_MQ_LOGS_QUEUE_NAME'),
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
