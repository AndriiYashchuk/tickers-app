import { Subjects } from './base/subjects';
import { UserSendEmail } from '../types/UserSendEmail';

export interface UserResendEmailEvent {
  subject: Subjects.UserSendEmailConfirmation;
  data: UserSendEmail;
}
