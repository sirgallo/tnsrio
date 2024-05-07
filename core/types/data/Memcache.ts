import { MemcacheDb } from '@core/types/data/Redis';


export interface MemcacheOpts<T extends string> {
  cacheName: MemcacheDb;
  expirationInSec?: number;
  prefix?: T;
}