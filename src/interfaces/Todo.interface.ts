interface ITodo {
  id: string;
  description: string;
  isDone: boolean;
}

interface INewTodo {
  description: string;
}

interface ITodoStatus {
  isDone: boolean;
}

export type { ITodo, INewTodo, ITodoStatus };
