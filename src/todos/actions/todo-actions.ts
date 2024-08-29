'use server';

import { revalidatePath } from 'next/cache';

import { Todo } from '@prisma/client';
import prisma from '@/app/lib/prisma';

export const toggleTodo = async (id: string, done: boolean): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) throw `Todo width id '${id}' not found`;

  const updateTodo = await prisma.todo.update({
    where: {
      id,
    },
    data: { done },
  });

  revalidatePath('/dashboard/server-actions');

  return updateTodo;
};

export const createTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } });

    revalidatePath('/dashboard/server-actions');

    return todo;
  } catch (error) {
    return {
      message: 'Error when creating TODO',
    };
  }
};

export const deleteTodo = async () => {
  try {
    const todo = await prisma.todo.deleteMany({
      where: { done: true },
    });

    revalidatePath('/dashboard/server-actions');

    return todo;
  } catch (error) {
    return {
      message: 'Error when creating TODO',
    };
  }
};
