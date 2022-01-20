import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState } from '../atoms/songAtom'
import useSpotify from './useSpotify'

const useSonginfo = () => {
  const spotifyApi = useSpotify()
  //   const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState<any>(null)

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        // const response = await spotifyApi.getTrack(currentTrackId)
        // setSongInfo(response.data)

        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          },
        ).then(res => res.json())
        setSongInfo(trackInfo)
      }
    }

    fetchSongInfo()
  }, [currentTrackId, spotifyApi])

  return songInfo
}
export default useSonginfo
