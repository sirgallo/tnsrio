import { TensorflowProvider } from './TensorflowProvider.js';


export class RegressionProvider {
  constructor(private tfProvider: TensorflowProvider) {}

  async linear() {}

  async multivariant() {}
}