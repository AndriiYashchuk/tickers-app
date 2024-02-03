import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './types/User';
import { CurrentUserFromJwtInterceptor } from './incerceptors/current-user-from-jwt.interceptor';

@Controller({
  version: '1',
  path: '/api/assets',
})
@UseInterceptors(CurrentUserFromJwtInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/whoami')
  whoAmI(@CurrentUser() user: User): User {
    return user;
  }
}
