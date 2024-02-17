import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtUser } from '../../types/JwtUser';

@Injectable()
export class MockCurrentUserFromJwtInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Promise<any> {
    const request = context.switchToHttp().getRequest();
    request.currentUser = {
      id: '1',
      isAdmin: false,
      iat: 123455,
      email: 'test@gmail.com',
    } as JwtUser;

    return handler.handle();
  }
}
