import React from 'react'
import { useSession } from 'next-auth/react'

const Center = () => {
  const { data: session } = useSession()
  return (
    <div className="flex flex-grow text-white">
      <h1>I am center</h1>
      <header>
        <div>
          <img src={session?.user?.image ?? ''} alt="" />
        </div>
      </header>
    </div>
  )
}

export default Center
