import request = require('supertest');
import { User as UserModel, UserAttrs } from '../../models/user';
import { app } from '../../app';
import { isIncludeErrorMessage } from '../../helpers/is-include-error-message';

const userInDb = {
  email: 'test@gmail.com',
  password: 'password',
  name: 'name',
  surname: 'surname',
  isAdmin: false
};

it('Admin can get list of users', async () => {
  // put the second user in db
  const user = UserModel.build(userInDb as UserAttrs);
  await user.save();

  const cookie = await global.signin();

  const response = await request(app)
    .get('/api/users')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.users.length).toEqual(2);
});

it('Not admin cant get access to users list', async () => {
  const user1 = UserModel.build(userInDb as UserAttrs);
  const user2 = UserModel.build({
    email: 'test2@gmail.com',
    password: 'password',
    name: 'user2',
    surname: 'surname2',
  } as UserAttrs);
  await user1.save();
  await user2.save();

  // login by not admin
  const cookie = await global.signin(userInDb);

  const response = await request(app)
    .get('/api/users')
    .set('Cookie', cookie)
    .send()
    .expect(401);
  expect(isIncludeErrorMessage(response, 'Not authorized')).toBeTruthy();
});
