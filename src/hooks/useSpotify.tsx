import React, { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
// import spotifyApi from "../"

const useSpotify = () => {
  const { data: session, status } = useSession()
  useEffect(() => {
    if (session) {
      console.log(session)
      if (session.error === 'refreshAccessTokenError') {
        signIn()
      }
    }
  }, [session])
  return <div></div>
}

export default useSpotify
