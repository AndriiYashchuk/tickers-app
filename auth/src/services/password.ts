const bcrypt = require("bcrypt")

export class Password {
  static async toHash(plaintextPassword: string) {
    return await bcrypt.hash(plaintextPassword, 10);
  }

  static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
    return await bcrypt.compare(suppliedPassword, storedPassword);
  }
}
