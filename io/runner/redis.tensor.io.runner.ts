import { TensorIO, tensorIORunner } from '../tensor.io.js';
import { TensorIOOpts, TENSOR_IO_RUNNER_RESULTS_REGISTRY } from '../tensor.io.types.js';


export class RedisIORunner extends TensorIO<TENSOR_IO_RUNNER_RESULTS_REGISTRY['redis']> {
  constructor() { super(); }

  async runIO(): Promise<TENSOR_IO_RUNNER_RESULTS_REGISTRY['redis']> {
    return true;
  }
}


const ioOpts: TensorIOOpts<TENSOR_IO_RUNNER_RESULTS_REGISTRY['redis']> = {
  ioRunner: new RedisIORunner()
};

tensorIORunner(ioOpts);