import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(process.env.PORT);

  Logger.log(`
    🚀 Server ready at http://localhost:${process.env.PORT}${process.env.GRAPHQL_PATH}
    🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${process.env.GRAPHQL_SUBSCRIPTION}`);
}
bootstrap();
