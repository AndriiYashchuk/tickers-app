import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { parseJWT } from '../utils';

@Injectable()
export class CurrentUserFromJwtInterceptor implements NestInterceptor {
  constructor(private jwtServ: JwtService) {}

  async intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const { session } = request.cookies;

    if (session) {
      try {
        const { jwt: jwtToken } = parseJWT(session);
        // TODO: need to check if the token created date is more than 3 days, need to make a
        //  request on auth service to prolong jwt
        request.currentUser = await this.jwtServ.verifyAsync(jwtToken, {
          secret: process.env.JWT_KEY!,
        });

        return handler.handle();
      } catch (e) {
        console.error(
          `There is a problem retrieving user data from jwt. Session data is: ${session}`,
        );
        throw new UnauthorizedException();
      }
    }

    throw new UnauthorizedException();
  }
}
