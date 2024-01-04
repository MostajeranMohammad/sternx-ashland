import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Log } from './models/log.model';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerProvider {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  saveLogs(data: Log) {
    this.logger.log('log received from gallatin', data);
  }
}
