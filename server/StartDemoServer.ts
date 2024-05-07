import { DemoServer } from './DemoServer';
import { serverConfiguration } from './ServerConfiguration';


const server = new DemoServer(serverConfiguration.demo);

try {
  server.startServer();
} catch (err) { console.log(err); }