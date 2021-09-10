import Todos from '../model/todos';
import { Request, Response } from 'express';
import { ITodo } from '../interfaces/Todo.interface';
import { HttpCode } from '../helpers/constants';

const getAll = async (
  _req: Request,
  res: Response,
  next: (arg0: any) => void,
) => {
  try {
    const todos: ITodo[] = await Todos.listTodos();
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { todos },
    });
  } catch (error) {
    next(error);
  }
};

const create = async (
  req: Request,
  res: Response,
  next: (arg0: any) => void,
) => {
  try {
    const newTodo: ITodo = await Todos.addTodo(req.body);
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { newTodo },
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (
  req: Request,
  res: Response,
  next: (arg0: any) => void,
) => {
  const todoId: string = req.params.todoId;
  try {
    const todo: ITodo = await Todos.removeTodo(todoId);
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

const updateStatus = async (
  req: Request,
  res: Response,
  next: (arg0: any) => void,
) => {
  const todoId: string = req.params.todoId;
  try {
    if (typeof req.body.isDone === 'undefined') {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'Missing field is Done!',
      });
    }
    const todo: ITodo = await Todos.updateStatusTodo(todoId, req.body);
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

export default {
  getAll,
  create,
  remove,
  updateStatus,
};
