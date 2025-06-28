import { NextFunction, Request, RequestHandler, Response } from 'express';

const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export { asyncHandler };
