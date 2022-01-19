import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyAPI, { LOGIN_URL } from '../../../lib/spotify'

async function refreshAccessToken(token: any) {
  try {
    spotifyAPI.setAccessToken(token.accessToken)
    spotifyAPI.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = spotifyAPI.refreshAccessToken()

    console.log('REFREHED TOKEN IS: ', refreshedToken)
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      // = 1 hour as 3600 returns from spotify API
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
      // Replace if new one came back else fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: 'refreshAccessTokenError',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? '',
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET ?? '',
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt(JWT_PROPS) {
      const { token, account, user } = JWT_PROPS
      console.log('indide jwt callback', JWT_PROPS)
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires:
            (account.expires_at && account.expires_at * 1000) ||
            Date.now() + 3600 * 1000,
          //   we are handling expiry time in Milliseconds hence * 1000
        }
      }

      // Return previous token if the access token has not expired yet
      if (
        Date.now() <
        (typeof token?.accessTokenExpires === 'number' &&
          token.accessTokenExpires)
      ) {
        console.log('EXISTING ACCESS TOKEN IS VALID', token)
        return token
      }

      //   Access token has expired, so we need to refresh it...
      console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING...', token)
      return await refreshAccessToken(token)
    },

    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    },
  },
})
