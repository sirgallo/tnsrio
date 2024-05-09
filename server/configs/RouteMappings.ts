import { ROUTE, STATUSOK, INFO } from '../../core/log/Log';
import { BaseRoute } from '../types/RouteMappings';


type GlobalPollRoute = 'poll';
type GlobalPollRouteSubRoutes = 'root';

/*
  routeMappings:
    single source of truth for all routes, with all subRoutes and custom logs defined here.
    can have multiple routeMappings per project.
    base project will always have a poll route for health checks.
*/
export const routeMappings: { [route in GlobalPollRoute]: BaseRoute<route, GlobalPollRouteSubRoutes> } = {
  poll: {
    key: 'poll',
    name: '/poll',
    subRouteMappings: {
      root: {
        key: 'root',
        name: '/',
        customConsoleMessages: [
          {
            1: { text: '/poll', color: ROUTE },
            2: { text: '200', color: STATUSOK },
            3: { text: 'healthcheck success...', color: INFO }
          }
        ]
      }
    }
  }
}