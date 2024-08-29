import { NextRequest, NextResponse } from 'next/server';

import prisma from '../../lib/prisma';

export async function GET(request: NextRequest) {
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
    take,
    skip,
  });

  return NextResponse.json(todos);
}
