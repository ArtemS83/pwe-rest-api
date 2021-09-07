const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const boolParser = require('express-query-boolean');
const helmet = require('helmet');

const limiter = require('./helpers/limiter');
const { HttpCode, Limit } = require('./helpers/constants');

const todosRouter = require('./routes/api/todos');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet());
app.use(limiter);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: Limit.MAX_JSON_SIZE_15KB }));
app.use(boolParser());

app.use('/api/todos', todosRouter);

app.use((_req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' });
});

app.use((err, _req, res, _next) => {
  const code = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  const status = err.status ? 'error' : 'fail';
  res.status(code).json({ status, code, message: err.message });
});

module.exports = app;