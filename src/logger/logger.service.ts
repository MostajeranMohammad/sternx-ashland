import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Log } from './models/log.model';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerProvider {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    setInterval(() => {
      this.logger.log('Logger is working');
    }, 5000);
  }

  async saveLogs(data: Log) {
    this.logger.log(data);
  }
}
