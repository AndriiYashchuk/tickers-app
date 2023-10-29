import { Subjects, Publisher, UserResendEmailEvent } from '@tickers-app/common-server';

export class UserResendEmailPublisher extends Publisher<UserResendEmailEvent> {
  subject: Subjects.UserSendEmailConfirmation = Subjects.UserSendEmailConfirmation;
}
