import { Listener, Subjects, UserCreatedEvent } from '@tickers-app/common-server';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Mailer } from '../../mailer';
import { getBody } from '../../templates/confirmation';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.UserCreated = Subjects.UserCreated;

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    Mailer.sendMessage({
      to: data.email,
      subject: 'Email confirmation',
      html: getBody({
        name: data.name ? ' ' + data.name : '',
        domain: Mailer.domain,
        token: data.token
      })
    });
    msg.ack();
  }
}
