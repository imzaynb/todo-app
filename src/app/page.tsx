"use client";

import Header from '@/components/header';
import { useUser } from '@clerk/nextjs'

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser();
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
