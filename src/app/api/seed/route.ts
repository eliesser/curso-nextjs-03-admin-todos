import { NextResponse, NextRequest } from 'next/server';

import bcrypt from 'bcryptjs';

import prisma from '../../lib/prisma';

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: 'test1@google.com',
      password: bcrypt.hashSync('1234546'),
      roles: ['admin', 'client', 'super-user'],
      todos: {
        create: [
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
      },
    },
  });

  return NextResponse.json({ msg: 'Seed execute' });
}
