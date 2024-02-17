import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

type ClassConstructor = new (...args: any[]) => unknown;

export class SerializeInterceptors implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any): any =>
        plainToInstance(this.dto, data, {
          excludeExtraneousValues: false,
        }),
      ),
    );
  }
}

export function Serialize(dto: any): MethodDecorator & ClassDecorator {
  return UseInterceptors(new SerializeInterceptors(dto));
}
