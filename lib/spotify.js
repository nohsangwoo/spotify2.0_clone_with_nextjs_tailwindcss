import SpotifyWebApi from 'spotify-web-api-node/src/spotify-web-api'

const scopes = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  // 'streaming',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  //   'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read',
].join(',')

// # token access scopes
// 'user-read-playback-position',
// 'user-read-private',
// 'user-read-email',
// 'playlist-modify-public',
// 'playlist-modify-private',
// 'playlist-read-public',
// 'playlist-read-private',
// 'user-library-read',
// 'user-library-modify',
// 'user-top-read',
// 'playlist-read-collaborative',
// 'ugc-image-upload',
// 'user-follow-read',
// 'user-follow-modify',
// 'user-read-playback-state',
// 'user-modify-playback-state',
// 'user-read-currently-playing',
// 'user-read-recently-played',
const params = {
  scope: scopes,
}

const queryParamString = new URLSearchParams(params).toString()

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  //   redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
})

export default spotifyApi

export { LOGIN_URL }
