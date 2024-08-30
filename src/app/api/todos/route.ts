import { NextRequest, NextResponse } from 'next/server';
import { boolean, object, string } from 'yup';

import prisma from '../../lib/prisma';
import { getUserSessionServer } from '@/auth/actions/auth-actions';

export async function GET(request: NextRequest) {
  const user = await getUserSessionServer();

  if (!user) return NextResponse.json('Unauthorized', { status: 401 });

  const searchParams = request.nextUrl.searchParams;

  const take = Number(searchParams.get('take') ?? '10');
  const skip = Number(searchParams.get('skip') ?? '0');

  if (isNaN(take))
    return NextResponse.json(
      { message: 'Take must be a number' },
      { status: 400 }
    );

  if (isNaN(skip))
    return NextResponse.json(
      { message: 'Skip must be a number' },
      { status: 400 }
    );

  const todos = await prisma.todo.findMany({
    where: {
      userId: user.id,
    },
    take,
    skip,
  });

  return NextResponse.json(todos);
}

const postSchema = object({
  description: string().required(),
  done: boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  const user = await getUserSessionServer();

  if (!user) return NextResponse.json('Unauthorized', { status: 401 });

  try {
    const { description, done } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({
      data: { description, done, userId: user.id },
    });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getUserSessionServer();

  if (!user) return NextResponse.json('Unauthorized', { status: 401 });

  try {
    const todo = await prisma.todo.deleteMany({
      where: { userId: user.id, done: true },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
