'use server';

import { revalidatePath } from 'next/cache';

import { Todo } from '@prisma/client';
import prisma from '@/app/lib/prisma';

export async function toggleTodo(id: string, done: boolean): Promise<Todo> {
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
}
