import { NextRequest, NextResponse } from 'next/server';

import { boolean, object, string } from 'yup';

import prisma from '../../../lib/prisma';
import { Todo } from '@prisma/client';
import { getUserSessionServer } from '@/auth/actions/auth-actions';

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserSessionServer();

  if (!user) return null;

  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  if (todo?.userId !== user.id) return null;

  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo)
    return NextResponse.json(
      { message: `Todo width id '${params.id}' not found` },
      { status: 404 }
    );

  return NextResponse.json(todo);
}

const postSchema = object({
  description: string().optional(),
  done: boolean().optional(),
});

export async function PUT(request: NextRequest, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo)
    return NextResponse.json(
      { message: `Todo width id '${params.id}' not found` },
      { status: 404 }
    );

  try {
    const { description, done } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.update({
      where: {
        id: params.id,
      },
      data: { description, done },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
