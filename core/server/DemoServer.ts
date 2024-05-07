import { Server } from '@core/server/Server';


/*
  BaseServer is built to be extended.

  add a socket server on top? 
  add additional providers?

  up to you.
*/
export class DemoServer extends Server<string> {
  initService = async (): Promise<boolean> => true;
  startEventListeners = async () => null;
}