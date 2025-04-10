import { NextFunction, Request, Response } from 'express';
import context from '@/data/context';

export const inject = (
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction,
) => {
  res.locals.context = context;
  next();
};

// export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
// }

export default {
  inject,
};
