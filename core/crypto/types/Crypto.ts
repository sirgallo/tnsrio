type CRYPTO_INPUTS = {
  ALGORITHM: 'sha128' | 'sha256';
  FORMAT: 'bytes' | 'hex';
};

export interface HashOpts { 
  data: string; 
  algorithm: CRYPTO_INPUTS['ALGORITHM'];
  format: CRYPTO_INPUTS['FORMAT'];
}

export type HashResult = Buffer | string;