export const validateRecaptcha = jest.fn().mockImplementation(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (token: string, clientIp?: string): Promise<boolean> =>
    Promise.resolve(token !== 'error')
);
