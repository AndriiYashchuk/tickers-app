import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
// import { app } from '../app';

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
