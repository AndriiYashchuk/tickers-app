import request from 'supertest';
import { app } from '../../app';
import { User as UserModel, UserAttrs } from '../../models/user';
import { validateRecaptcha } from '../../services/reCaptcha';

const testUserInDb = {
  email: 'test@gmail.com',
  password: 'password',
  name: 'name',
  surname: 'surname',
};

it('should check validation email password and token', async () => {
  // check email
  await request(app)
    .post('/api/users/signin')
    .send({
      email: '',
      password: 'password',
      token: 'token',
    })
    .expect(400);

  // check password
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@tes.com',
      password: '1',
      token: 'token',
    })
    .expect(400);

  // check token
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@tes.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test1234@gmail.com',
      password: 'password',
      token: 'token',
    })
    .expect(400);
});

it('fails when incorrect password is supplied ', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test1234@gmail.com',
      password: 'testpassword',
      token: 'token',
    })
    .expect(400);
});

it('Correctly sign in', async () => {
  // put user in db
  const user = UserModel.build(testUserInDb as UserAttrs);
  await user.save();

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: testUserInDb.email,
      password: testUserInDb.password,
      token: 'token',
    })
    .expect(200);

  // check that session created
  expect(response.get('Set-Cookie')).toBeDefined();

  // check that validateRecaptcha called
  expect(validateRecaptcha).toHaveBeenCalled();
});

it('fails if user not confirmed email (has inactive flag) ', async () => {
  // put user with inactive flag in db
  const user = UserModel.build({ ...testUserInDb, inActive: true } as UserAttrs);
  await user.save();

  await request(app)
    .post('/api/users/signin')
    .send({
      email: testUserInDb.email,
      password: testUserInDb.password,
      token: 'token',
    })
    .expect(403);
});
