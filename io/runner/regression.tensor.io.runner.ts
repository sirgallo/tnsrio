import { TensorIO, tensorIORunner } from '../tensor.io.js';
import { TENSOR_IO_RUNNER_RESULTS_REGISTRY } from '../tensor.io.types.js';


class RegressionIORunner extends TensorIO<TENSOR_IO_RUNNER_RESULTS_REGISTRY['regression']> {
  constructor() { super(); }

  async runIO(): Promise<TENSOR_IO_RUNNER_RESULTS_REGISTRY['regression']> {
    return true;
  }
}


tensorIORunner({
  ioRunner: new RegressionIORunner()
});