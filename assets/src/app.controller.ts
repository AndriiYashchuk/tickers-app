import { Controller, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller({
  version: '1',
  path: '/api/assets',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/whoami')
  whoAmI(@CurrentUser(new JwtService()) user: string): string {
    return user;
  }
}
