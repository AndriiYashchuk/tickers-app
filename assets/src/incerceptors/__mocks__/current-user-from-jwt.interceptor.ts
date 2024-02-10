import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { User } from '../../types/User';

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
    } as User;

    return handler.handle();
  }
}
