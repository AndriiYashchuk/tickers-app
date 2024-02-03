import { JwtService } from '@nestjs/jwt';
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { parseJWT } from '../utils';

export const CurrentUser = createParamDecorator(
  async (jwtServ: JwtService, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { session } = request.cookies;
    if (!session) {
      return null;
    }
    const { jwt: jwtToken } = parseJWT(session);
    try {
      const user = await jwtServ.verifyAsync(jwtToken, {
        secret: process.env.JWT_KEY!,
      });
      // TODO: need to check if the token created date is more than 3 days, need to make a
      //  request on auth service to prolong jwt
      return user;
    } catch (e) {
      console.error('There is a problem to retrieve user data from jwt.');
      throw new UnauthorizedException();
    }
  },
);
