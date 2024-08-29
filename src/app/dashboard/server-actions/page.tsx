import { Metadata } from 'next';

import prisma from '@/app/lib/prisma';
import { TodoNew, TodosGrid } from '@/todos';

export const metadata: Metadata = {
  title: 'list of TODOS',
  description: 'Generated by create next app',
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });

  return (
    <>
      <span className='text-3xl mb-10'>Server Actions</span>

      <div className='w-full px-4 mx-5 mb-5'>
        <TodoNew />
      </div>

      <TodosGrid todos={todos} />
    </>
  );
}
