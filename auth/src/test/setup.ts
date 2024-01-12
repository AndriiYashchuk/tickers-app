import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request = require('supertest');
import { app } from '../app';
import { User as UserModel, UserAttrs } from '../models/user';

let mongo: any;
jest.mock('../services/redis');
jest.mock('../nats-wrapper');
jest.mock('../services/reCaptcha');

beforeAll(async () => {
  process.env.JWT_KEY = 'jwt_key';
  process.env.RECAPTCHA_KEY = 'recaptcha_key';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  // eslint-disable-next-line no-restricted-syntax
  for (const collection of collections) {
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

interface UserParams {
  email?: string;
  password?: string;
  isAdmin?: boolean;
}

global.signin = async ({
  email = 'tickersapp@gmail.com',
  password = '1234pasword',
  isAdmin = true
}: UserParams = {}): Promise<string []> => {
  const user = UserModel.build({ email, password, isAdmin } as UserAttrs);
  await user.save();

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email,
      password,
      token: 'token',
    })
    .expect(200);

  const cookie = response.get('Set-Cookie');
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    existingUser.inActive = undefined;
    await existingUser.save();
  }

  return cookie;
};
