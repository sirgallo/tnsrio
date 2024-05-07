import { createHash } from 'crypto';

import { HashOpts, HashResult } from '../types/Crypto.js';


export class CryptoUtils {
  static generateHash = (opts: HashOpts): HashResult => {
    const hasher = createHash(opts.algorithm);
    hasher.update(opts.data);
    
    if (opts.format === 'bytes') return hasher.digest();
    return hasher.digest(opts.format);
  }
}