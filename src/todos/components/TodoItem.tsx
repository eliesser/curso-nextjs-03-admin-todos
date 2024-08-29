'use client';

import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

import { Todo } from '@prisma/client';

import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
  toggleTodo: (id: string, done: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  return (
    <div className={todo.done ? styles.todoDone : styles.todoPending}>
      <div
        className='flex flex-col sm:flex-row justify-start items-center gap-4 cursor-pointer'
        onClick={() => toggleTodo(todo.id, !todo.done)}
      >
        <div
          className={`flex items-center gap-2 p-2 rounded-md hover:bg-opacity-60 ${
            todo.done ? 'bg-blue-100' : 'bg-red-100'
          }`}
        >
          {todo.done ? <IoCheckboxOutline size={30} /> : <IoSquareOutline size={30} />}
        </div>
        <div className='text-center sm::text-left'>{todo.description}</div>
      </div>
    </div>
  );
};
