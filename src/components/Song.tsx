import React, { useEffect } from 'react'
import useSpotify from '../hooks/useSpotify'

interface Props {
  order: number
  track: any
}
const Song = ({ order, track }: Props) => {
  const spotifyApi = useSpotify()
  useEffect(() => {}, [])
  return (
    <div>
      <div>
        <p>{order + 1}</p>
        <img className="h-10 w-10" src={track.track.album.images[0].url} />
      </div>
    </div>
  )
}

export default Song
