import * as cookieParser from 'cookie-parser';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  it('/healthcheck (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/assets/healthcheck')
      .set('Cookie', ['session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcGMwRmtiV2x1SWpwMGNuVmxMQ0pwWVhRaU9qRTNOREU0TVRBd01EVjkuczBRSEZOb0o3R1pyWEdOOGhXTm9IRWd5VWhzTURnTkFxaDBJai1uVWRSNCJ9']) // <-- Добавляем cookie
      .expect(200)
      .expect({ status: 'ok' });
  });
});
