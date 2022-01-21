import React, { useEffect, useState } from 'react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'

type playlistType = {
  collaborative: boolean
  description: string
  external_urls: { spotify: string }
  href: string
  id: string
  images: { height?: string | number; url: string; width?: string | number }[]
  name: string
  owner: {
    display_name: string
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    type: string
  }
  primary_color?: string | number
  public: boolean
  snapshot_id: string
  tracks: { href: string; total: number }
  type: string
  uri: string
}

const Sidebar = () => {
  const spotifyApi = useSpotify()
  // useSession을 사용하고 싶으면 permission을 얻어야함(_app.tsx에서 설정)
  // 즉 SessionProvider를 설정해주면 됨
  const { data: session, status } = useSession()
  const [plyalists, setPlaylists] = useState<playlistType[]>([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, useSpotify])

  return (
    <div
      className="text-gray-500 p-5 text-xs lg:text-sm border-r 
    border-gray-900 overflow-y-scroll h-screen sm:max-w-[12rem] 
    lg:max-w-[15rem] hidden md:inline-flex pb-36"
    >
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h5 w-5" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* play list... */}
        {plyalists.map(playlist => {
          return (
            <p
              key={playlist.id}
              className="cursor-pointer hover:text-white"
              onClick={() => setPlaylistId(playlist.id)}
            >
              {playlist.name}
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
