import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification/notification.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(NotificationModule, {
    transport: Transport.RMQ,
    options: {
      name:'RABBIT_ORDERS' ,
      urls: ['amqp://localhost:5672'], // Adjust URL based on your RabbitMQ setup
      queue: 'orders_queue', // Queue name
      queueOptions: {
        durable: true, // Make the queue durable
      },
    },
  });

  await app.listen();
}
bootstrap();
