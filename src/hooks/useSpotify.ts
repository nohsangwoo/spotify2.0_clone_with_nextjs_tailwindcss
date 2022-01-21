import React, { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
// import spotifyApi from '../lib/spotify'
// const SpotifyWebApi = require('spotify-web-api-node/src/spotify-web-api')
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

const useSpotify = () => {
  const { data: session, status } = useSession()
  useEffect(() => {
    if (session) {
      // If refresh access token attempt fails, direct user to login...

      try {
        if (session?.error === 'refreshAccessTokenError') {
          signIn()
        }
      } catch (e) {
        console.log(e)
      }

      // @ts-ignore
      spotifyApi.setAccessToken(session?.user?.accessToken)
    }
  }, [session])
  return spotifyApi
}

export default useSpotify
