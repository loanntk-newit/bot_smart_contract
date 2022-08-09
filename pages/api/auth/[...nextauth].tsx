import NextAuth, { User } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import type { JWTCustom } from 'next-auth/jwt'

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const res: any = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          email: credentials?.username,
          password: credentials?.password,
        })

        const user = res.data.data

        // If no error and we have user data, return it
        if (res.status === 200 && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        const expiresIn: any = user ? user.expires_in : 0
        token.userInfo = user
        token.accessTokenExpires = Date.now() + expiresIn * 1000
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() > token.accessTokenExpires) {
        return refreshAccessToken(token)
      }

      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.userInfo = token.userInfo
      session.accessTokenExpires = token.accessTokenExpires
      return session
    },
  },

  pages: {
    signIn: '/auth/login',
  },
  theme: {
    colorScheme: 'light', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code
    logo: '', // Absolute URL to image
    buttonText: '', // Hex color code
  },
})

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: any) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/refresh`

    const response = await axios.post(url, {
      refresh_token: token.user.refresh_token,
    })

    console.log('response', response.data.data)

    const user = response.data.data

    if (response.status !== 200) {
      throw response
    }

    token.user.access_token = user.access_token
    token.user.refresh_token = user.refresh_token
    token.accessTokenExpires = Date.now() + 86400 * 1000

    return token
  } catch (error) {
    console.error(error)

    return {
      error: 'RefreshAccessTokenError',
    }
  }
}
