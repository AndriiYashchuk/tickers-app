import { Stan, Message } from 'node-nats-streaming';
import { Listener } from '@tickers-app/server/src/events/base/listener';
import { UserCreatedEvent } from '@tickers-app/server/src/events/UserCreatedEvent';
import { Subjects } from '@tickers-app/server/src/events/base/subjects';
import { QueueGroupNames } from '@tickers-app/server/src/nest/event-bus/queueGroupNames';

import { Mailer } from '../../../utils/mailer';
import { getBody } from '../../../templates/confirmation';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  queueGroupName = QueueGroupNames.AUTH_GROUP;

  subject: Subjects.UserCreated = Subjects.UserCreated;

  constructor(
    natsClient: Stan,
    private domain: string,
  ) {
    super(natsClient);
  }

  async onMessage(data: UserCreatedEvent['data'], msg: Message): Promise<void> {
    console.log(data);
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
