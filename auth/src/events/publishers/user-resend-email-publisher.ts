import { Subjects, Publisher, UserResendEmailEvent } from '@tickers-app/server/src/events';

export class UserResendEmailPublisher extends Publisher<UserResendEmailEvent> {
  subject: Subjects.UserSendEmailConfirmation = Subjects.UserSendEmailConfirmation;
}
