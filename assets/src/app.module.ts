import { JwtService } from '@nestjs/jwt';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksModule } from './stocks/stocks.module';
import { CheckUserInterceptor } from './interceptors/check-user-interceptor.service';
import { AuthGuard } from './guards/auth.guard';
import { IsCurrentUserAdminInterceptor } from './interceptors/is-current-user-admin.interceptor';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { LabelsModule } from './labels/labels.module';
import { CurrentUserMiddleware } from '@tickers-app/server/src/middlewares/current-user.middlewares';
import developmentConfig from './configurations/development.config';
import productionConfig from './configurations/production.config';
import { Config } from './configurations/Config';
import typeOrmConfig from '../ormconfig';

const config: Config =
  process.env.NODE_ENV === 'development' ? developmentConfig : productionConfig;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [(): Config => config],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
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
  constructor() {
    if (config.isProduction && !process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined in process.env.JWT_KEY');
    }
  }

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
