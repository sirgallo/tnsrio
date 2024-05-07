import { Redis, RedisOptions } from 'ioredis';
import { GetClientOpts, REDIS_SERVICE_REGISTRY, RedisDb, RedisService } from '@core/types/data/Redis';


export class RedisProvider {
  private clientMapping: { [service in RedisDb]?: Redis } = {};
  constructor(private redisOpts: RedisOptions) {}

  getClient<T extends RedisService>(opts: GetClientOpts<T>): Redis {
    const validatedOpts: RedisOptions = { 
      ...this.redisOpts, 
      ...{ db: REDIS_SERVICE_REGISTRY[opts.service].dbs[opts.db] }
    };

    if (! this.clientMapping[opts.db]) this.clientMapping[opts.db] = new Redis(validatedOpts);
    return this.clientMapping[opts.db];
  }
}