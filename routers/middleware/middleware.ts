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

export default {
  inject,
};
