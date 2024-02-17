import { JwtService } from '@nestjs/jwt';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksModule } from './stocks/stocks.module';
import { Stock } from './stocks/stock.entity';
import { CheckUserInterceptor } from './incerceptors/check-user-interceptor.service';
import { AuthGuard } from './guards/auth.guard';
import { IsCurrentUserAdminInterceptor } from './incerceptors/is-current-user-admin.interceptor';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { LabelsModule } from './labels/labels.module';
import { Label } from './labels/label.entity';
import { CurrentUserMiddleware } from './middlewares/current-user.middlewares';

const isDevEnv = process.env.npm_lifecycle_event === 'start:dev';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Stock, Label],
      synchronize: isDevEnv,
    }),
    StocksModule,
    PortfoliosModule,
    LabelsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: IsCurrentUserAdminInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CheckUserInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
