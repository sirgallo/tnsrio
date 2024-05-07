import { TensorIO } from '@toolset/tensor.io';


type KNNIOResults = boolean;

export class KNNIO extends TensorIO {
  constructor() { super(); }

  async runTest(): Promise<boolean> {
    return true;
  }
}


new KNNIO().runTest();