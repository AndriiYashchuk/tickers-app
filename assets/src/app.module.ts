import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksModule } from './stocks/stocks.module';
import { Stock } from './stocks/stock.entity';
import { CurrentUserFromJwtInterceptor } from './incerceptors/current-user-from-jwt.interceptor';

const isDevEnv = process.env.npm_lifecycle_event === 'start:dev';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Stock],
      synchronize: isDevEnv,
    }),
    StocksModule,
  ],
  controllers: [AppController],
  providers: [AppService, CurrentUserFromJwtInterceptor, JwtService],
})
export class AppModule {}
