import { RedisOptions, Redis } from 'ioredis';

import { RedisProvider } from '@core/providers/data/RedisProvider';
import { MemcacheOpts } from '@core/types/data/Memcache';


export class MemcacheProvider<T extends string, V extends { [field: string]: any }> {
  redisClient: Redis;
  
  private prefix: string;
  private expirationInSec: number;

  constructor(
    opts: { 
      cacheOpts: MemcacheOpts<T>,
      redisOpts?: RedisOptions 
    }
  ) {
    this.prefix = opts.cacheOpts.prefix;
    this.expirationInSec = opts.cacheOpts.expirationInSec;
    this.redisClient = new RedisProvider(opts.redisOpts).getClient({ service: 'memcache', db: opts.cacheOpts.cacheName });
  }

  prefixedKey = (key: string): string => `${this.prefix}:${key}`;

  async set(key: string, value: string): Promise<boolean> {
    const prefixedKey = this.prefixedKey(key);
    await this.redisClient.set(prefixedKey, value);
    if (this.expirationInSec) this.redisClient.expire(prefixedKey, this.expirationInSec);
    
    return true;
  }

  async get(key: string): Promise<any> {
    const prefixedKey = this.prefixedKey(key);
    const strResp = await this.redisClient.get(prefixedKey);
    if (strResp) return JSON.parse(strResp);
  }

  async delete(key: string): Promise<boolean> {
    const prefixedKey = this.prefixedKey(key);
    await this.redisClient.del(prefixedKey);
    return true;
  }

  async hset(key: string, value: V): Promise<boolean> {
    const prefixedKey = this.prefixedKey(key);
    await this.redisClient.hset(prefixedKey, value);
    return true;
  }

  async hget(key: string, field: string): Promise<string> {
    const prefixedKey = this.prefixedKey(key);
    return this.redisClient.hget(prefixedKey, field);
  }

  async hgetall(key: string): Promise<V> {
    const prefixedKey = this.prefixedKey(key);
    const value = await this.redisClient.hgetall(prefixedKey);
    
    return value as V;
  }

  flush(): boolean{
    this.redisClient.flushdb();
    return true;
  }
}