const Todos = require('../model/todos');
const { HttpCode } = require('../helpers/constants');

const getAll = async (_req, res, next) => {
  try {
    const todos = await Todos.listTodos();
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { todos },
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newTodo = await Todos.addTodo(req.body);
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { newTodo },
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const todoId = req.params.todoId;
  try {
    const todo = await Todos.removeTodo(todoId);
    if (todo) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'todo deleted',
      });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  const todoId = req.params.todoId;
  try {
    if (typeof req.body.isDone === 'undefined') {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'Missing field is Done!',
      });
    }
    const todo = await Todos.updateStatusTodo(todoId, req.body);
    if (todo) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { todo } });
    }

    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  remove,
  updateStatus,
};
