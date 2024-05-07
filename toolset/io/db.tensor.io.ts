import { ExecTensorResponse, TensorData, TensorMetadataOperation, TensorOperation } from '@core/types/data/TensorDb';
import { generateRandomTensorData } from '@toolset/mock/tensor.io.data';
import { TensorIO, tensorIORunner } from '@toolset/tensor.io';
import { TensorIOOpts, TensorIOResults } from '@toolset/tensor.io.types';


type DBIOResults = ExecTensorResponse<TensorOperation | TensorMetadataOperation>;

export class DBIO extends TensorIO<DBIOResults> {
  constructor() { super() }

  async runTest(): Promise<DBIOResults> {
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

const opts: TensorIOOpts<DBIOResults> = { 
  ioProcessor: new DBIO()
}

tensorIORunner(opts);