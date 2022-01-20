import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from './Song'

const Songs = () => {
  const playlist = useRecoilValue(playlistState)
  console.log('inside songs component: ', playlist)
  return (
    <div
      className="p-8 flex flex-col space-y-1 pb-28 
    text-white"
    >
      {playlist?.tracks?.items?.map((track: any, index: number) => (
        <Song key={track.track.id} order={index} track={track} />
      ))}
    </div>
  )
}

export default Songs
