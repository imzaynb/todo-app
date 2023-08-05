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
          <div className="">
            {isSignedIn ? (
              <>
                <div className="">Welcome {user.firstName}!</div>
              </>
            ) : (
              <div className="">
                Sign in to create your todo list!
              </div>
            )}
          </div>
        </main>
      )}
    </>
  )
}
