import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    LoggerModule,
    WinstonModule.forRoot({
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.printf((info) => {
              const { timestamp, level, message, ...args } = info;
              return `${timestamp} [${level}]: ${message} ${
                Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
              }`;
            }),
          ),
        }),
        new transports.File({
          filename: 'logs/info.log',
          level: 'info',
        }),
      ],
    }),
  ],
})
export class AppModule {}
