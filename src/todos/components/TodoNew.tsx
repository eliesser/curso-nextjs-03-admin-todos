'use client';

import { useRouter } from 'next/navigation';

import { FormEvent, useState } from 'react';

import { IoTrashOutline } from 'react-icons/io5';

import * as todosApi from '@/todos/helpers/todos';

export const TodoNew = () => {
  const router = useRouter();
  const [description, setDescription] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (description.trim().length === 0) return;

    const createTodo = await todosApi.createTodo(description);

    setDescription('');

    router.refresh();

    return createTodo;
  };

  const deleteCompleted = async () => {
    const deleteTodo = await todosApi.deleteTodo();

    router.refresh();
  };

  return (
    <form className='flex w-full' onSubmit={onSubmit}>
      <input
        type='text'
        className='w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all'
        placeholder='¿Qué necesita ser hecho?'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <button
        type='submit'
        className='flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all'
      >
        Create
      </button>

      <span className='flex flex-1'></span>

      <button
        type='button'
        className='flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all'
        onClick={() => deleteCompleted()}
      >
        <IoTrashOutline />
        Delete
      </button>
    </form>
  );
};
