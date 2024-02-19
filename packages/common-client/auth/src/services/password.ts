const bcrypt = require('bcrypt');

export class Password {
  static async toHash(plaintextPassword: string): Promise<string> {
    return bcrypt.hash(plaintextPassword, 10);
  }

  static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
    return bcrypt.compare(suppliedPassword, storedPassword);
  }
}
