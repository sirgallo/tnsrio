import { RedisOptions } from 'ioredis';

import { QueueDb } from '@core/types/data/Redis';


export interface QueueOpts {
  queueName: QueueDb;
  redisOpts?: RedisOptions;
}

export type BPOPResp = [
  string,          // queue name
  string           // element
];