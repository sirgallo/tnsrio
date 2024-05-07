import { TensorIO, tensorIORunner } from '../tensor.io.js';
import { TensorIOOpts, TENSOR_IO_RUNNER_RESULTS_REGISTRY } from '../tensor.io.types.js';
import { generateRandomTensorData } from '../mock/tensor.io.data.js';


export class DBIORunner extends TensorIO<TENSOR_IO_RUNNER_RESULTS_REGISTRY['db']> {
  constructor() { super() }

  async runIO(): Promise<TENSOR_IO_RUNNER_RESULTS_REGISTRY['db']> {
    await this.insertMockData();
    return true;
  }

  async insertMockData() {
    try {
      const tensors = generateRandomTensorData(10, [10, 10])
      await this.tensorDb.exec<'AI.TENSORSET'>({ tensors, tensorType: 'FLOAT' });
      
      this.zLog.info('mock data successfully inserted');
      return true;
    } catch (error) {
        console.error('Failed to insert mock data:', error);
    }
  }
}

const opts: TensorIOOpts<TENSOR_IO_RUNNER_RESULTS_REGISTRY['db']> = { 
  ioRunner: new DBIORunner()
};

tensorIORunner(opts);