import { Listener, Subjects, UserResendEmailEvent } from '@tickers-app/common-server';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Mailer } from '../../mailer';
import { getBody } from '../../templates/confirmation';

export class UserResendEmailConfirmationListener extends Listener<UserResendEmailEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.UserSendEmailConfirmation = Subjects.UserSendEmailConfirmation;

  async onMessage(data: UserResendEmailEvent['data'], msg: Message): Promise<void> {
    Mailer.sendMessage({
      to: data.email,
      subject: 'Email confirmation',
      html: getBody({
        name: data.name,
        domain: Mailer.domain,
        token: data.token,
        userId: data.userId
      })
    });
    msg.ack();
  }
}
