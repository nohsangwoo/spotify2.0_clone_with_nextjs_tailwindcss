import React, { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
const SpotifyWebApi = require('spotify-web-api-node/src/spotify-web-api')

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

const useSpotify = () => {
  const { data: session, status } = useSession()
  useEffect(() => {
    if (session) {
      // If refresh access token attempt fails, direct user to login...
      if (session.error === 'refreshAccessTokenError') {
        signIn()
      }

      // console.log('session is: ', session)

      // @ts-ignore
      spotifyApi.setAccessToken(session?.user?.accessToken)
    }
  }, [session])
  return spotifyApi
}

export default useSpotify
