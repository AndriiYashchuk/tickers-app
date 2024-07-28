import { Subjects } from './base/subjects';

export interface UserCreatedEvent {
  subject: Subjects.UserCreated
  data: {
    email: string,
    token: string,
    name: string,
    surname: string,
    userId: string,
  }
}
