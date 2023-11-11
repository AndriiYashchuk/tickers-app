import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@tes.com',
    password: 'password',
    token: 'token',
  })
  .expect(201));
