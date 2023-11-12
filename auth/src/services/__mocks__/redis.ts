export const redisClientInstance = {
  redis: {
    set: jest
      .fn()
      .mockImplementation(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (key: string, token: string, ex: string, lifeTime: number): Promise<string> =>
          Promise.resolve(token)
      ),
    get: jest
      .fn()
      .mockImplementation(
        (key: string): Promise<string> => Promise.resolve(`${key}test`)
      ),
    del: jest
      .fn()
      .mockImplementation(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (key: string): Promise<void> => Promise.resolve()
      ),
  },
};
