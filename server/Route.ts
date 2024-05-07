import { Response, Router, Request, NextFunction } from 'express';
import { join } from 'path';


// Route:
//  all routes need to extend this class
export abstract class Route {
  protected _router: Router;
  protected _rootpath: string;

  constructor(opts: { basepath?: string, path: string }) { 
    this._router = Router(); 
    this._rootpath = this.mergeBaseRoutePath(opts);
  }

  get router() { return this._router };
  get rootpath() { return this._rootpath; }

  private mergeBaseRoutePath = (opts: { base?: string, path: string }) => opts?.base ? join(opts.base, opts.path) : opts.path;

  protected async pipeRequest(opts: RouteOpts, req: Request, res: Response, next: NextFunction, params: any): Promise<boolean> {
    const validated = await this.validateRoute(req, res, next);
    if (validated) { 
      await this.performRouteAction(opts, req, res, next, params);
      return true;
    } else {
      res.status(403).send({ err: 'unauthorized on route' });
      return false;
    }
  }

  abstract validateRoute(req: Request, res: Response, next: NextFunction): Promise<boolean>;
  abstract performRouteAction(opts: RouteOpts, req: Request, res: Response, next: NextFunction, params: any): Promise<void>;
}


export interface RouteOpts {
  method: string;
  customMsg: any;
}