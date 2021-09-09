const Todo = require('../schemas/todo');

const listTodos = async () => {
  const results = await Todo.find({});
  return results.reverse();
};

const removeTodo = async todoId => {
  const result = await Todo.findByIdAndRemove(todoId);
  return result;
};

const addTodo = async body => {
  const result = await Todo.create(body);
  return result;
};

const updateStatusTodo = async (todoId, body) => {
  const result = await Todo.findByIdAndUpdate(
    todoId,
    { ...body },
    { new: true },
  );

  return result;
};

module.exports = {
  listTodos,
  removeTodo,
  addTodo,
  updateStatusTodo,
};
