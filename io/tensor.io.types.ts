import { homedir } from 'os';
import { join } from 'path';

import { TensorIO } from './tensor.io.js';

import { ExecTensorResponse, TensorDbOpts, TensorMetadataOperation, TensorOperation } from '../core/data/types/TensorDb.js';


export interface TensorIOOpts<T> {
  ioRunner: TensorIO<T>;
  saveResultsToDisk?: boolean;
  dbOpts?: TensorDbOpts;
}

export interface TensorIOResults<T> {
  timestamp: string;
  durationInMs: number;
  results: T;
}

export type TENSOR_IO_RUNNER_RESULTS_REGISTRY = { // register runners here
  db: ExecTensorResponse<TensorOperation | TensorMetadataOperation>;
  knn: boolean;
  redis: boolean;
  regression: boolean;
};


export const DEFAULT_RESULTS_FOLDER = join(homedir(), 'tensor/results');