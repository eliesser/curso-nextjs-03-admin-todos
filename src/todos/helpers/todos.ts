import { Todo } from '@prisma/client';

const sleep = (seconds: number = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const updateTodo = async (id: string, done: boolean): Promise<Todo> => {
  // await sleep(2);

  const body = { done };

  const todo = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resp.json());

  return todo;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };

  const todo = await fetch(`/api/todos`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resp.json());

  return todo;
};

interface ResponseDelete {
  count: number;
}

export const deleteTodo = async (): Promise<ResponseDelete> => {
  const todo = await fetch(`/api/todos`, {
    method: 'DELETE',
  }).then((resp) => resp.json());

  return todo;
};
