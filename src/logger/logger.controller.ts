import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { LoggerProvider } from './logger.service';
import { Log } from './models/log.model';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerProvider) {}

  @MessagePattern('save-logs')
  async receiveLogs(data: Log, @Ctx() context: RmqContext) {
    await this.loggerService.saveLogs(data);
    context.getChannelRef().ack(context.getMessage());
  }
}
