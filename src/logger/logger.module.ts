import { Module } from '@nestjs/common';
import { LoggerProvider } from './logger.service';
import { LoggerController } from './logger.controller';

@Module({
  providers: [LoggerProvider],
  controllers: [LoggerController],
})
export class LoggerModule {}
