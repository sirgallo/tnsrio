import { env } from 'process';


type EnvironementKey = 
  'TENSOR_DB_HOST'
  | 'TENSOR_DB_PORT'
  | 'TENSOR_DB_USER'
  | 'TENSOR_DB_PASS';

type EnvValue<T extends EnvironementKey> =
  T extends 'TENSOR_DB_HOST' | 'TENSOR_DB_USER' | 'TENSOR_DB_PASS' ? string
  : T extends 'TENSOR_DB_PORT' ? number
  : never;


const envValueValidator = <T extends EnvironementKey>(envKey: T): EnvValue<T> => {
  if (envKey === 'TENSOR_DB_HOST') return (env[envKey] ?? 'localhost') as EnvValue<T>;
  if (envKey === 'TENSOR_DB_PORT') return (parseInt(env[envKey]) ?? 6379) as EnvValue<T>;
  if (envKey === 'TENSOR_DB_USER') return parseInt(env[envKey] ?? 'tensor_dev_user') as EnvValue<T>;
  if (envKey === 'TENSOR_DB_PASS') return (env[envKey] ?? 'tensor_dev_pass') as EnvValue<T>;

  return env[envKey] as EnvValue<T>;
};

export const envLoader: { [envKey in EnvironementKey]: EnvValue<envKey> } = {
  'TENSOR_DB_HOST': envValueValidator('TENSOR_DB_HOST'),
  'TENSOR_DB_PORT': envValueValidator('TENSOR_DB_PORT'),
  'TENSOR_DB_USER': envValueValidator('TENSOR_DB_USER'),
  'TENSOR_DB_PASS': envValueValidator('TENSOR_DB_PASS')
};