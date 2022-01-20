import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSonginfo from '../hooks/useSonginfo'

const Player = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volumn, setVolumn] = useState(50)

  const songInfo = useSonginfo()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data: any) => {
        console.log('data: ', data)
        setCurrentTrackId(data?.body?.item?.id)

        spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
          console.log('Now Playing: ', data?.body)
          setIsPlaying(data?.body?.is_playing)
        })
        setIsPlaying(data?.body?.is_playing)
      })
    }
  }

  console.log('songInfo: ', songInfo)
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      //   fetch the song info
      fetchCurrentSong()
      setVolumn(50)
    }
  }, [currentTrackId, spotifyApi, session])
  return (
    <div className="h-24 bg-gradient-to-b from-black
     to-gray-900 text-white">
      {/* left */}
      <div>
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album?.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Player
