import { Listener } from '@tickers-app/server/src/events/base/listener';
import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from '@tickers-app/server/src/events/base/subjects';
import { QueueGroupNames } from '@tickers-app/server/src/nest/event-bus/queueGroupNames';
import { UserResendEmailEvent } from '@tickers-app/server/src/events/UserResendEmailEvent';

import { Mailer } from '../../../utils/mailer';
import { getBody } from '../../../templates/confirmation';

export class UserResendEmailConfirmationListener extends Listener<UserResendEmailEvent> {
  queueGroupName = QueueGroupNames.AUTH_GROUP;

  subject: Subjects.UserSendEmailConfirmation =
    Subjects.UserSendEmailConfirmation;

  constructor(
    natsClient: Stan,
    private domain: string,
  ) {
    super(natsClient);
  }

  async onMessage(
    data: UserResendEmailEvent['data'],
    msg: Message,
  ): Promise<void> {
    Mailer.sendMessage({
      to: data.email,
      subject: 'Email confirmation',
      html: getBody({
        name: data.name,
        domain: this.domain,
        token: data.token,
        userId: data.userId,
      }),
    });
    msg.ack();
  }
}
