import { NextResponse, NextRequest } from 'next/server';

import prisma from '../../lib/prisma';

export async function GET(request: Request) {
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      {
        description: 'Piedra del alma',
        done: true,
      },
      {
        description: 'Piedra del poder',
        done: false,
      },
      {
        description: 'Piedra del tiempo',
        done: false,
      },
      {
        description: 'Piedra del espacio',
        done: false,
      },
      {
        description: 'Piedra de la realidad',
        done: false,
      },
    ],
  });

  return NextResponse.json({ msg: 'Seed execute' });
}
