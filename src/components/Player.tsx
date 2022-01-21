import {
  HeartIcon,
  ReplyIcon,
  VolumeUpIcon as VolumnDownicon,
} from '@heroicons/react/outline'
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState, useCallback } from 'react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSonginfo from '../hooks/useSonginfo'
import { debounce } from 'lodash'

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

  const handlePlayPause = useCallback(() => {
    spotifyApi.getMyCurrentPlaybackState().then(data => {
      if (data?.body?.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }, [spotifyApi, setIsPlaying])

  const handleVolumnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // setVolumn(+event?.target?.value)
      // spotifyApi.setVolume(+event?.target?.value)
      if (event) {
        setVolumn(+event?.target?.value)
      }
    },
    [setVolumn],
  )

  const handleVolumnDown = useCallback(() => {
    if (volumn > 0) {
      setVolumn(volumn - 10)
      if (volumn < 10) {
        setVolumn(0)
      }
    }
    // spotifyApi.getMyCurrentPlaybackState().then(data => {
    //   if (data?.body?.is_playing) {
    //     spotifyApi.setVolume(volumn - 10)
    //     setVolumn(volumn - 10)
    //   }
    // })
  }, [spotifyApi, volumn, setVolumn])

  const handleVolumnUp = useCallback(() => {
    if (volumn < 100) {
      setVolumn(volumn + 10)
      if (volumn > 90) {
        setVolumn(100)
      }
    }
    // spotifyApi.getMyCurrentPlaybackState().then(data => {
    //   if (data?.body?.is_playing) {
    //     spotifyApi.setVolume(volumn + 10)
    //     setVolumn(volumn + 10)
    //   }
    // })
  }, [spotifyApi, volumn, setVolumn])

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      //   fetch the song info
      fetchCurrentSong()
      setVolumn(50)
    }
  }, [currentTrackId, spotifyApi, session])

  useEffect(() => {
    if (volumn > 0 && volumn < 100) {
      // spotifyApi.setVolume(volumn)
      debouncedAdjustVolumn(volumn)
    }
  }, [volumn])

  const debouncedAdjustVolumn = useCallback(
    debounce(volumn => {
      spotifyApi.setVolume(volumn).catch(err => {
        console.log('err: ', err)
      })
    }, 500),
    [spotifyApi, volumn],
  )

  console.log('volumn: ', volumn)
  return (
    <div
      className="h-24 bg-gradient-to-b from-black
     to-gray-900 text-white grid grid-cols-3 text-xs
     md:text-base px-2 md:px-8"
    >
      {/* Left */}
      <div className="flex items-center space-x-4">
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

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />

        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}
        <FastForwardIcon className="button" />

        <ReplyIcon className="button" />
      </div>

      {/* Right */}
      <div
        className="flex items-center space-x-3
      md:space-x-4 justify-items-end pr-5"
      >
        <VolumnDownicon className="button" onClick={handleVolumnDown} />
        <input
          className="w-14 md:w-[6.5rem]"
          type="range"
          min="0"
          max="100"
          value={volumn}
          onChange={handleVolumnChange}
        />
        <VolumeUpIcon onClick={handleVolumnUp} className="button" />
      </div>
    </div>
  )
}

export default Player
