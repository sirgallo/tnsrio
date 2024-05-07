import { TensorIO, tensorIORunner } from '../tensor.io.js';
import { TensorIOOpts, TENSOR_IO_RUNNER_RESULTS_REGISTRY } from '../tensor.io.types.js';


export class RegressionIOOpts extends TensorIO<TENSOR_IO_RUNNER_RESULTS_REGISTRY['regression']> {
  constructor() { super(); }

  async runIO(): Promise<TENSOR_IO_RUNNER_RESULTS_REGISTRY['regression']> {
    return true;
  }
}


const ioOpts: TensorIOOpts<TENSOR_IO_RUNNER_RESULTS_REGISTRY['regression']> = {
  ioRunner: new RegressionIOOpts()
};

tensorIORunner(ioOpts);