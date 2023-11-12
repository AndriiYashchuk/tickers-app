import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';
import { validateRecaptcha } from '../../services/reCaptcha';
import { redisClientInstance } from '../../services/redis';

it('returns a 201 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@tes.com',
      password: 'password',
      token: 'token',
    })
    .expect(201);
});

it('should check validation email password and token', async () => {
  // check email
  await request(app)
    .post('/api/users/signup')
    .send({
      email: '',
      password: 'password',
      token: 'token',
    })
    .expect(400);

  // check password
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@tes.com',
      password: '1',
      token: 'token',
    })
    .expect(400);

  // check token
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@tes.com',
      password: 'password',
    })
    .expect(400);
});

it('Check that email in use (user already registered)', async () => {
  const email = 'test1@gmail.com';
  await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password: 'password',
      token: 'token',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password: 'password',
      token: 'token',
    })
    .expect(400);
});

it('Check that email confirmation token was putted in the redis', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test2@gmail.com',
      password: 'password',
      token: 'token',
    })
    .expect(201);
  expect(redisClientInstance.redis!.set).toHaveBeenCalled();
});

it('Check that the user registration message was put in the event bus', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test3@gmail.com',
      password: 'password',
      token: 'token',
    })
    .expect(201);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('Check that validate reCaptcha service was called', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test4@gmail.com',
      password: 'password',
      token: 'token',
    })
    .expect(201);
  expect(validateRecaptcha).toHaveBeenCalled();
});
