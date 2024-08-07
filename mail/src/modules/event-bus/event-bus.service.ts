import { Inject, Injectable } from '@nestjs/common';
import { Stan } from 'node-nats-streaming';
import { ConfigService } from '@nestjs/config';
import { UserCreatedListener } from './listeners/user-created-listener';
import { UserResendEmailConfirmationListener } from './listeners/user-resend-email-confirmation-listener';

@Injectable()
export class EventBusService {
  constructor(
    @Inject('NATS_CLIENT') private readonly stan: Stan,
    configService: ConfigService,
  ) {
    new UserCreatedListener(this.stan, configService.get('domain')).listen();
    new UserResendEmailConfirmationListener(
      this.stan,
      configService.get('domain'),
    ).listen();
  }
}
