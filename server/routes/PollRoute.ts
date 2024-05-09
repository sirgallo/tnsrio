import { Request, Response, NextFunction } from 'express';

import { LogProvider } from '../../core/log/LogProvider';
import { Route, RouteOpts } from '../Route';
import { routeMappings } from '../configs/RouteMappings';


/*
  PollRoute:
    1.) health check endpoint.
    2.) return response if alive
*/
export class PollRoute extends Route {
  private log: LogProvider = new LogProvider(PollRoute.name);

  constructor(path: string) {
    super({ path });
    this.router.get(routeMappings.poll.subRouteMappings.root.name, this.poll.bind(this));
  }

  private poll(_req: Request, _res: Response, _next: NextFunction) {
    this.log.custom(routeMappings.poll.subRouteMappings.root.customConsoleMessages[0], true);
    _res.status(200).send({ alive: 'okay' });
  }

  validateRoute = async (_req: Request, _res: Response, _next: NextFunction): Promise<boolean> => true;
  performRouteAction = async (_opts: RouteOpts, _req: Request, _res: Response, _next: NextFunction) => null;
}