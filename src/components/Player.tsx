import React from 'react'
import { useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'

const Player = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  return (
    <div>
      {/* left */}
      <div>
        <img src="" alt="" />
      </div>
    </div>
  )
}

export default Player
