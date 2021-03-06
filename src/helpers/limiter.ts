import rateLimit from 'express-rate-limit';
import { HttpCode, Limit } from './constants';
import { Request, Response } from 'express';

export const limiter = rateLimit({
  windowMs: Limit.TIME_15_MINUTES,
  max: Limit.MAX_REQUEST_EACH_IP, // 100 -limit each IP to 100 requests per windowMs
  handler: (_req: Request, res: Response, _next: any) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Too many requests, please try again later.',
    });
  },
});
