import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { configuration } from '../config/configuration';
import { LeadsController } from './leads.controller';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RMQS',
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
      },
    ]),
  ],
  controllers: [LeadsController],
})
export class LeadsModule {}
