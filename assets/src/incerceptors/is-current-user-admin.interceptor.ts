import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { User } from '../types/User';

@Injectable()
export class IsCurrentUserAdminInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.currentUser;

    if (!user.isAdmin) {
      throw new ForbiddenException();
    }

    return handler.handle();
  }
}
