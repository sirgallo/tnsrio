import { TensorflowProvider } from 'common/tensor/providers/TensorflowProvider';


export class RegressionProvider {
  constructor(private tfProvider: TensorflowProvider) {}

  async linear() {}

  async multivariant() {}
}