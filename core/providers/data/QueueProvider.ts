import { Redis } from 'ioredis';

import { RedisProvider } from '@core/providers/data/RedisProvider';
import { QueueOpts, BPOPResp } from '@core/types/data/Queue';


export class QueueProvider {
  private redisClient: Redis;
  private queueName: string;

  constructor(opts: QueueOpts) {
    this.redisClient = new RedisProvider(opts?.redisOpts).getClient({ service: 'queue', db: opts.queueName });
    this.queueName = opts.queueName;
  }

  async leftPush(elements: any[]): Promise<boolean> {
    await this.redisClient.lpush(this.queueName, ...elements);
    return true;
  }

  async rightPush(elements: any[]): Promise<boolean> {
    await this.redisClient.rpush(this.queueName, ...elements);
    return true;
  }

  async blockingLeftPop(opts: { timeout: number, waitIndefinitely?: boolean }): Promise<BPOPResp> {
    return this.redisClient.blpop(this.queueName, opts?.waitIndefinitely ? 0 : opts.timeout);
  }

  async blockingRightPop(opts: { timeout: number, waitIndefinitely?: boolean }): Promise<BPOPResp> {
    return this.redisClient.brpop(this.queueName, opts?.waitIndefinitely ? 0 : opts.timeout);
  }
}