import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { JwtUser } from '@tickers-app/common/types/domain/JwtUser';
import { AppService } from './app.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CheckUserInterceptor } from './interceptors/check-user-interceptor.service';
import { IsCurrentUserAdminInterceptor } from './interceptors/is-current-user-admin.interceptor';
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
