import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { signOut } from 'next-auth/react'
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res: any = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          email: credentials?.username,
          password: credentials?.password,
        })
        const user = res.data
        if (res) {
          return user
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        const expiresIn: any = user ? user?.user?.expiredAt : 0
        token.userInfo = user
        token.accessTokenExpires = Date.now() + Date.parse(expiresIn) * 1000
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() > token.accessTokenExpires) {
        return null
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
    signIn: '/login',
  },
})
