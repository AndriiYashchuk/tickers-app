import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { withRetry } from '@tickers-app/common/src/utils/withRetry';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

const FIVE_MINUTE = 5 * 60 * 1000;

withRetry(bootstrap, FIVE_MINUTE, console.error);
