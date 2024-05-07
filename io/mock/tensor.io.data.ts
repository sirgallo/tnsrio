import { TensorData } from '../../core/data/types/TensorDb.js';


export const generateRandomTensorData = (numTensors: number, dimensions: number[]): TensorData[] => { // function to generate random data for tensors
  const tensors: TensorData[] = [];
  for (let i = 0; i < numTensors; i++) {
    const values = Array.from({ length: dimensions.reduce((acc, val) => acc * val, 1) }, () => Math.random());
    tensors.push({ k: `tensor_${i}`, v: values, shape: { dimensions } });
  }

  return tensors;
}