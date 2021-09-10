import { Todo } from '../schemas/todo';
import { ITodo, INewTodo, ITodoStatus } from '../interfaces/Todo.interface';

const listTodos = async () => {
  const results: ITodo[] = await Todo.find({});
  return results.reverse();
};

const removeTodo = async (todoId: string) => {
  const result: ITodo = await Todo.findByIdAndRemove(todoId);
  return result;
};

const addTodo = async (body: INewTodo) => {
  const result: ITodo = await Todo.create(body);
  return result;
};

const updateStatusTodo = async (todoId: string, body: ITodoStatus) => {
  const result: ITodo = await Todo.findByIdAndUpdate(
    todoId,
    { ...body },
    { new: true },
  );

  return result;
};

export default {
  listTodos,
  removeTodo,
  addTodo,
  updateStatusTodo,
};
