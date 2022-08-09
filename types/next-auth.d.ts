import type { JWTCustom, JWT } from 'next-auth/jwt'
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  type JWTCustom = JWT & {
    /** OpenID ID Token */
    idToken?: string
    userInfo?: Object
    accessTokenExpires: number
  }
}
