"use client";

import AddTodoForm from '@/components/add-todo-form';
import Header from '@/components/header';
import TodoList from '@/components/todo-list';
import { Todo } from '@/types/todo';
import { useUser } from '@clerk/nextjs'
import { useState } from 'react';

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser();
  const [todos, setTodos] = useState<Todo[] | null>(null);

  return (
    <>
      <Header />
      {!isLoaded ? (
        <></>
      ) : (
        <main>
          <div className="container mt-8">
            {isSignedIn ? (
              <>
                <TodoList todos={todos} setTodos={setTodos} />
              </>
            ) : (
              <div className="leading-7 [&:not(:first-child)]:mt-6">
                Sign in to create your todo list!
              </div>
            )}
          </div>
        </main>
      )}
    </>
  )
}
