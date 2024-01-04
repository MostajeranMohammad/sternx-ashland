import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

export class Configuration {
  @IsString()
  environment: string;

  @IsString()
  rabbitMqHost: string;

  @IsNumber()
  rabbitMqPort: number;

  @IsString()
  rabbitMqLogsQueueName: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(Configuration, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
