import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoggerProvider } from './logger.service';
import { Log } from './models/log.model';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerProvider) {}

  @MessagePattern('save-logs')
  async receiveLogs(data: Log) {
    this.loggerService.saveLogs(data);
  }
}
