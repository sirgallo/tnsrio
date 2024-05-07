import { DemoServer } from '@core/server/DemoServer';
import { serverConfiguration } from '@core/server/ServerConfiguration';


const server = new DemoServer(serverConfiguration.demo);

try {
  server.startServer();
} catch (err) { console.log(err); }