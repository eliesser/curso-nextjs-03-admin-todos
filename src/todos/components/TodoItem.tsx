'use client';

import { startTransition, useOptimistic } from 'react';

import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

import { Todo } from '@prisma/client';

import styles from './TodoItem.module.css';
import { StatementSync } from 'node:sqlite';

interface Props {
  todo: Todo;
  toggleTodo: (id: string, done: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newDoneValue: boolean) => ({
      ...state,
      done: newDoneValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.done));
      await toggleTodo(todoOptimistic.id, !todoOptimistic.done);
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.done));
    }
  };

  return (
    <div className={todoOptimistic.done ? styles.todoDone : styles.todoPending}>
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
        <div
          className={`flex items-center gap-2 p-2 rounded-md hover:bg-opacity-60 cursor-pointer ${
            todoOptimistic.done ? 'bg-blue-100' : 'bg-red-100'
          }`}
          onClick={onToggleTodo}
        >
          {todoOptimistic.done ? <IoCheckboxOutline size={30} /> : <IoSquareOutline size={30} />}
        </div>
        <div className='text-center sm::text-left'>{todoOptimistic.description}</div>
      </div>
    </div>
  );
};
