import { ServerConfiguration } from '@core/server/types/ServerConfiguration';


type ApplicableServers = 'demo';

export const serverConfiguration: { [server in ApplicableServers]: ServerConfiguration<server> } = {
  demo: {
    root: '/demo',
    port: 7890,
    name: 'demo api',
    numOfCpus: 1,
    version: '0.1'
  }
};