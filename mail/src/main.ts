import { NestFactory } from '@nestjs/core';
import { withRetry } from '@tickers-app/common/src/utils/withRetry';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

const FIVE_MINUTE = 5 * 60 * 1000;

withRetry(bootstrap, FIVE_MINUTE, console.error);
