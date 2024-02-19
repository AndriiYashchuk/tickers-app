import request = require('supertest');
import { isIncludeErrorMessage } from '../../helpers/is-include-error-message';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';
import { redisClientInstance } from '../../services/redis';
import { User as UserModel, UserAttrs } from '../../models/user';
import { getKey, putTokenToRedis } from '../../services/email-confirmaton';

const testUserInDb = {
  email: 'test@gmail.com',
  password: 'password',
  name: 'name',
  surname: 'surname',
};

it('check params validation', async () => {
  const user = UserModel.build({ ...testUserInDb, inActive: true } as UserAttrs);
  const savedUser = await user.save();

  let response;
  response = await request(app)
    .post('/api/users/resend-email')
    .send({})
    .expect(400);
  expect(isIncludeErrorMessage(response, 'Email must be valid')).toBeTruthy();

  response = await request(app)
    .post('/api/users/resend-email')
    .send({ email: 'fsdf' })
    .expect(400);
  expect(isIncludeErrorMessage(response, 'Email must be valid')).toBeTruthy();

  response = await request(app)
    .post('/api/users/resend-email')
    .send({ email: testUserInDb.email })
    .expect(400);
  expect(isIncludeErrorMessage(response, 'There isn`t recaptcha token')).toBeTruthy();

  await request(app)
    .post('/api/users/resend-email')
    .send({
      email: savedUser.email,
      token: 'token'
    })
    .expect(200);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('check reCaptcha', async () => {
  const response = await request(app)
    .post('/api/users/resend-email')
    .send({
      email: testUserInDb.email,
      token: 'error',
    })
    .expect(400);
  expect(isIncludeErrorMessage(response, 'We couldn\'t validate your submission with reCAPTCHA. Ensure you\'re not using any tools that might interfere, like certain browser extensions.')).toBeTruthy();
});

it('check there isn\'t user with tis email error', async () => {
  const response = await request(app)
    .post('/api/users/resend-email')
    .send({
      email: testUserInDb.email,
      token: 'token',
    })
    .expect(400);
  expect(isIncludeErrorMessage(response, 'There is no user with this email')).toBeTruthy();
});

it('check user already active error', async () => {
  // save user with in db
  const user = UserModel.build({ ...testUserInDb } as UserAttrs);
  await user.save();

  const response = await request(app)
    .post('/api/users/resend-email')
    .send({
      email: user.email,
      token: 'token',
    })
    .expect(400);
  expect(isIncludeErrorMessage(response, 'This user is already active')).toBeTruthy();
});

it('check that email was successfully resend', async () => {
  // save user with in db
  const user = UserModel.build({ ...testUserInDb, inActive: true } as UserAttrs);
  await user.save();
  await putTokenToRedis(user.id);

  await request(app)
    .post('/api/users/resend-email')
    .send({
      email: user.email,
      token: 'token',
    })
    .expect(200);

  // check that old token was deleted from redis
  expect(redisClientInstance.redis!.del).toHaveBeenCalledWith(getKey(user.id));

  // check that new token was saved in redis
  expect(redisClientInstance.redis!.set).toHaveBeenCalled();

  // check that event was published
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
