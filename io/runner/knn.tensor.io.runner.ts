import { TensorIO, tensorIORunner } from '../tensor.io.js';
import { TENSOR_IO_RUNNER_RESULTS_REGISTRY } from '../tensor.io.types.js';


class KNNIORunner extends TensorIO<TENSOR_IO_RUNNER_RESULTS_REGISTRY['knn']> {
  constructor() { super(); }

  async runIO(): Promise<TENSOR_IO_RUNNER_RESULTS_REGISTRY['knn']> {
    return true;
  }
}


tensorIORunner({ 
  ioRunner: new KNNIORunner()
});