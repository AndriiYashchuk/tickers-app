import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { parseJWT } from '../utils/parse-jwt';
import { JwtUser } from '../types/JwtUser';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private jwtServ: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { session } = req.cookies || {};

    if (session) {
      try {
        const { jwt: jwtToken } = parseJWT(session);
        // TODO: need to check if the token created date is more than 3 days, need to make a
        //  request on auth service to prolong jwt
        // @ts-ignore
        req.currentUser = await this.jwtServ.verifyAsync(jwtToken, {
          secret: process.env.JWT_KEY!,
        });
      } catch (e) {
        console.error(
          `There is a problem retrieving user data from jwt. Session data is: ${session}`,
        );
      }
    }

    next();
  }
}
