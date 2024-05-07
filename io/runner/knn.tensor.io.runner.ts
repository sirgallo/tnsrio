import { TensorIO, tensorIORunner } from '../tensor.io.js';
import { TensorIOOpts, TENSOR_IO_RUNNER_RESULTS_REGISTRY } from '../tensor.io.types.js';


export class KNNIO extends TensorIO<TENSOR_IO_RUNNER_RESULTS_REGISTRY['knn']> {
  constructor() { super(); }

  async runIO(): Promise<TENSOR_IO_RUNNER_RESULTS_REGISTRY['knn']> {
    return true;
  }
}


const ioOPts: TensorIOOpts<TENSOR_IO_RUNNER_RESULTS_REGISTRY['knn']> = {
  ioRunner: new KNNIO()
};

tensorIORunner(ioOPts);