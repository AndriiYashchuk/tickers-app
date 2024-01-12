import request = require('supertest');
import { isIncludeErrorMessage } from '../../helpers/is-include-error-message';
import { app } from '../../app';
import { redisClientInstance } from '../../services/redis';
import { User as UserModel, UserAttrs } from '../../models/user';
import { putTokenToRedis } from '../../services/email-confirmaton';

const testUserInDb = {
  email: 'test@gmail.com',
  password: 'password',
  name: 'name',
  surname: 'surname',
};

it('should confirm email with status 200', async () => {
  // put user with inactive flag in db
  const user = UserModel.build({ ...testUserInDb, inActive: true } as UserAttrs);
  const savedUser = await user.save();
  const token = await putTokenToRedis(savedUser.id);

  await request(app)
    .put(`/api/users/confirm-email/${token}?id=${savedUser.id}`)
    .send({})
    .expect(200);

  // find user in db and check that inActive flag is undefined
  const activatedUser = await UserModel.findById(savedUser.id);
  // check that inActive flag is undefined
  expect(activatedUser!.inActive).toBeUndefined();
  // check that user is saved in redis
  expect(redisClientInstance.redis!.get).toHaveBeenCalled();
});

it('check that token should be defined, and id present in query params', async () => {
  let response;
  await request(app)
    .put('/api/users/confirm-email')
    .send({})
    .expect(404);

  await request(app)
    .put('/api/users/confirm-email/sometoken')
    .send({})
    .expect(400);

  response = await request(app)
    .put('/api/users/confirm-email/sometoken?id=dsdfdggdfg')
    .send({});
  expect(response.status).toBe(400);
  expect(isIncludeErrorMessage(response, "There isn't user id in query params")).toBeTruthy();

  response = await request(app)
    .put('/api/users/confirm-email/sometoken?id=65529c0222d33b19f2c461df')
    .send({});
  expect(response.status).toBe(400);
  expect(isIncludeErrorMessage(response, 'Invalid userId')).toBeTruthy();
});

it('check email already confirmed error', async () => {
  const user = UserModel.build({ ...testUserInDb } as UserAttrs);
  const savedUser = await user.save();
  const token = await putTokenToRedis(savedUser.id);

  const response = await request(app)
    .put(`/api/users/confirm-email/${token}?id=${savedUser.id}`)
    .send({})
    .expect(400);

  expect(isIncludeErrorMessage(response, 'Email already confirmed')).toBeTruthy();
});

it('check token invalid error', async () => {
  const user = UserModel.build({ ...testUserInDb, inActive: true } as UserAttrs);
  const savedUser = await user.save();
  await putTokenToRedis(savedUser.id);
  const invalidToken = 'fbhjs63724r6grvfr76f34';

  const response = await request(app)
    .put(`/api/users/confirm-email/${invalidToken}?id=${savedUser.id}`)
    .send({})
    .expect(400);

  expect(isIncludeErrorMessage(response, 'Invalid token')).toBeTruthy();
});

it('check token expiration error', async () => {
  const user = UserModel.build({ ...testUserInDb, inActive: true } as UserAttrs);
  const savedUser = await user.save();
  // token that wasnt putted in redis
  const token = 'sdb736267gdgf346fgf';

  const response = await request(app)
    .put(`/api/users/confirm-email/${token}?id=${savedUser.id}`)
    .send({})
    .expect(400);

  expect(isIncludeErrorMessage(response, 'Confirmation token is expired')).toBeTruthy();
});
