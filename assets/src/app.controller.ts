import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtUser } from './types/JwtUser';
import { CheckUserInterceptor } from './incerceptors/check-user-interceptor.service';
import { IsCurrentUserAdminInterceptor } from './incerceptors/is-current-user-admin.interceptor';
import { BASE } from './contants/routes';

@Controller({
  version: '1',
  path: BASE,
})
@UseInterceptors(CheckUserInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/whoami')
  whoAmI(@CurrentUser() user: JwtUser): JwtUser {
    return user;
  }

  @Get('/healthcheck')
  @UseInterceptors(IsCurrentUserAdminInterceptor)
  healthCheck(): { status: string } {
    // TODO: response by getting logs file with errors
    return { status: 'ok' };
  }
}
