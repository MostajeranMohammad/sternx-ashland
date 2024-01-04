import { Configuration } from './validate';

export default () =>
  <Configuration>{
    environment:
      process.env.ENVIRONMENT == 'production' ? 'production' : 'development',
    rabbitMqHost: process.env.RABBIT_MQ_HOST,
    rabbitMqPort: parseInt(process.env.RABBIT_MQ_PORT, 10),
    rabbitMqLogsQueueName: process.env.RABBIT_MQ_LOGS_QUEUE_NAME,
  };
