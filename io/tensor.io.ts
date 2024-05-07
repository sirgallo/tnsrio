import { writeFileSync } from 'fs';
import { join } from 'path';

import { TensorIOOpts, TensorIOResults, DEFAULT_RESULTS_FOLDER } from './tensor.io.types.js';

import { TensorDbProvider } from '../core/data/providers/TensorDbProvider.js';
import { LogProvider } from '../core/LogProvider.js';
import { CryptoUtils } from '../core/crypto/providers/CryptoUtils.js';
import { TensorDbOpts } from '../core/data/types/TensorDb.js';
import { Timer } from '../core/utils/Timer.js';
import { envLoader } from '../common/envLoader.js';


export abstract class TensorIO<T> {
  protected tensorDb: TensorDbProvider;
  protected zLog = new LogProvider('toolset --> tensor.io');
  
  constructor() {}

  async start(opts?: TensorDbOpts): Promise<TensorIOResults<T>> {
    try {
      const timer = new Timer('tensor.io');
      timer.start('io.run');

      this.init(opts);
      const results = await this.runIO();
      timer.stop('io.run');
      const { start, stop, elapsed } = timer.getResults('io.run');

      return { timestamp: start.toISOString(), durationInMs: elapsed, results }
    } catch (err) { throw err; }
  }

  abstract runIO(): Promise<T>;

  private init(opts?: TensorDbOpts) {
    const validatedOpts = ((): TensorDbOpts => {
      if (! opts) { 
        console.log('opts -->', {
          host: envLoader.TENSOR_DB_HOST,
          port: envLoader.TENSOR_DB_PORT,
          username: envLoader['TENSOR_DB_USER'],
          password: envLoader['TENSOR_DB_PASS']
        });

        return { 
          dbName: 'tensorio',
          redisOpts: {
            host: envLoader.TENSOR_DB_HOST,
            port: envLoader.TENSOR_DB_PORT,
            username: envLoader.TENSOR_DB_USER,
            password: envLoader.TENSOR_DB_PASS
          }
        }
      }

      return opts;
    })();

    this.tensorDb = new TensorDbProvider(validatedOpts);
  }
}


export const tensorIORunner = async <T>(opts: TensorIOOpts<T>) => {
  const zLog = new LogProvider('toolset --> tensor.io.runner');

  const writeToDisk = (results: TensorIOResults<T>) => {
    const now = new Date().toISOString();
    const randHash = CryptoUtils.generateHash({ data: now, algorithm: 'sha256', format: 'hex' })
    const filename = join(DEFAULT_RESULTS_FOLDER, `${(randHash as string)}_${now}.results`);

    zLog.debug(`results output filename: ${filename}`);
    writeFileSync(filename, JSON.stringify(results));
  };
  
  try {
    const results = await opts.ioRunner.start();
    zLog.info(`results --> ${JSON.stringify(results, null, 2)}`);
    
    if (opts.saveResultsToDisk) { 
      zLog.debug('writing results to disk...');
      writeToDisk(results);
    }

    zLog.info('FINISHED');
    process.exit(0);
  } catch (err) {
    zLog.error(`error on run: ${err}`);
    process.exit(1);
  }
};