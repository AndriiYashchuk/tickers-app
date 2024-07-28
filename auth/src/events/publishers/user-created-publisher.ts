import { Subjects, Publisher, UserCreatedEvent } from '@tickers-app/server/src/events';

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
