import express, { Request, Response, Application } from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { limiter } from './helpers/limiter';
import { HttpCode, Limit } from './helpers/constants';
import todosRouter from './routes/api/todos';

const app: Application = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet());
app.use(limiter);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: Limit.MAX_JSON_SIZE_15KB }));

app.use('/api/todos', todosRouter);

app.use((_req: Request, res: Response) => {
  const code = HttpCode.NOT_FOUND;
  res.status(code).json({
    status: 'error',
    code,
    message: 'Not found',
  });
});

app.use(
  (
    err: { status: string | number; message: string },
    _req: Request,
    res: Response,
    _next: any,
  ) => {
    const code = HttpCode.INTERNAL_SERVER_ERROR;
    const status = err.status ? 'error' : 'fail';
    res.status(code).json({ status, code, message: err.message });
  },
);

export default app;
