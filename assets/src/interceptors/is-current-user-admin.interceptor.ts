import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtUser } from '@tickers-app/common/types/domain/JwtUser';

@Injectable()
export class IsCurrentUserAdminInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const user: JwtUser = request.currentUser;

    if (!user.isAdmin) {
      throw new ForbiddenException();
    }

    return handler.handle();
  }
}
