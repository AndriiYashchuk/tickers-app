import { redisClientInstance } from './redis';

const crypto = require('crypto');

const TOKEN_LIFE_TIME = 60 * 60 * 24; // 1 day

// Generate a random token (128 bits)
export const generateRandomToken = (): string =>
  crypto.randomBytes(16).toString('hex');

export const getKey = (userId: string): string =>
  `email_confirmation:${userId}`;

// Put in a token to Redis
export const putTokenToRedis = async (userId: string): Promise<string> => {
  const token = generateRandomToken();
  const key = getKey(userId);
  const redisClient = redisClientInstance.redis;
  await redisClient!.set(key, token, 'EX', TOKEN_LIFE_TIME);
  return token;
};

// Retrieve a token from Redis
export const getTokenFromRedis = async (userId: string): Promise<string | null> => {
  const redisClient = redisClientInstance.redis;
  const key = getKey(userId);
  const token = await redisClient!.get(key);
  return token;
};

// Delete a token from Redis
export const deleteTokenFromRedis = async (userId: string): Promise<void> => {
  const redisClient = redisClientInstance.redis;
  const key = getKey(userId);
  await redisClient!.del(key);
};
