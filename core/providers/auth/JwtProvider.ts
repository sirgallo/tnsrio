import { randomUUID } from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
const { sign, verify } = jsonwebtoken;

import { LogProvider } from '@core/providers/LogProvider';
import { cryptoOptions } from '@core/types/Crypto';
import { toMs } from '@core/utils/Utils';


const NAME = 'JWT Provider';
const SECRET = randomUUID(cryptoOptions);
export const TIMESPAN = toMs.min(15);
const minInDay = 1440;
export const REFRESHTIMESPAN = toMs.min(minInDay) * 30;


/*
  JWT provider, wrapping jsonwebtoken

  Performs basic signing and checking within range

  Will only work on systems where the key was generated
*/


export class JwtProvider {
  private zLog = new LogProvider(NAME);
  constructor(private secret = SECRET) {}

  withinExpiration = (issueDate: Date, expiresIn: number): boolean => (issueDate.getTime() + expiresIn) > new Date().getTime();
  
  async sign(userId: string, secret?: string, timeSpan = TIMESPAN): Promise<string> {
    return new Promise( (resolve, reject) => {
      try {
        const signedJwt = sign({ id: userId }, secret || this.secret, { expiresIn: timeSpan });
        return resolve(signedJwt);
      } catch (err) {
        this.zLog.error('error signing jwt');
        return reject(err);
      }
    });
  }

  async verified(token: string, secret?: string): Promise<{ token: string, verified: boolean}> {
    return new Promise( (resolve, reject) => {
      try {
        const decodedJwt = verify(token, secret ?? this.secret, { complete: true });
        if (decodedJwt) return resolve({ token, verified: true });
      } catch (err) { return reject(err); }
    });
  }
}