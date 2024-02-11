import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksModule } from './stocks/stocks.module';
import { Stock } from './stocks/stock.entity';
import { CurrentUserFromJwtInterceptor } from './incerceptors/current-user-from-jwt.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { IsCurrentUserAdminInterceptor } from './incerceptors/is-current-user-admin.interceptor';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { LabelsModule } from './labels/labels.module';
import { Label } from './labels/label.entity';

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
    CurrentUserFromJwtInterceptor,
    IsCurrentUserAdminInterceptor,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserFromJwtInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
