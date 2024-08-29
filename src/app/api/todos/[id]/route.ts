import { NextRequest, NextResponse } from 'next/server';

import { boolean, object, string } from 'yup';

import prisma from '../../../lib/prisma';
import { Todo } from '@prisma/client';

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  return await prisma.todo.findUnique({
    where: {
      id,
    },
  });
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
