import { compare, hash } from 'bcrypt';

import { LogProvider } from '@core/providers/LogProvider';


// Use bcrypt library to hash and salt any data (salt being number of rounds hashed). Default SHA256 is used.
export class EncryptProvider {
  private zLog = new LogProvider(EncryptProvider.name);
  constructor(private saltRounds = 10) {}

  async encrypt(data: string | Buffer): Promise<string> {
    try {
      this.zLog.info(`Encrypting with salt rounds ${this.saltRounds}`);
      return hash(data, this.saltRounds);
    } catch (err) {
      this.zLog.error('Error encrypting data');
      throw err;
    }
  }

  async compare(unEncryptedVal: string, encryptedVal: string): Promise<boolean> {
    try {
      return compare(unEncryptedVal, encryptedVal);
    } catch (err) {
      this.zLog.error('Error decrypting data');
      throw err;
    }
  }
}