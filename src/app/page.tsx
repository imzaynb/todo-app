"use client";

import AddTodoForm from '@/components/add-todo-form';
import Header from '@/components/header';
import TodoList from '@/components/todo-list';
import { useUser } from '@clerk/nextjs'
import { useState } from 'react';

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser();
  const [todos, setTodos] = useState(null);

  return (
    <>
      <Header />
      {!isLoaded ? (
        <></>
      ) : (
        <main>
          <div className="container mt-4">
            {isSignedIn ? (
              <>
                <div className="">Welcome {user.firstName}!</div>
                <AddTodoForm todos={todos} setTodos={setTodos} />
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
