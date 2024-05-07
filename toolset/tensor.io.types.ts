import { homedir } from 'os';
import { join } from 'path';

import { TensorDbOpts } from '@core/types/data/TensorDb';
import { TensorIO } from '@toolset/tensor.io';


export interface TensorIOOpts<T> {
  ioProcessor: TensorIO<T>;
  saveResultsToDisk?: boolean;
  dbOpts?: TensorDbOpts;
}

export interface TensorIOResults<T> {
  timestamp: string;
  durationInMs: number;
  results: T;
}


export const DEFAULT_RESULTS_FOLDER = join(homedir(), 'tensor/results');
export const DEFAULT_TENSOR_IO_DB = 'tensor_io_db';