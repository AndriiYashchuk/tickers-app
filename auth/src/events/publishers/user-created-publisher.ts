import { Subjects, Publisher, UserCreatedEvent } from '@tickers-app/common-server';

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
