import '../styles/globals.css'
import type { PropsWithChildren } from 'next'
import type { AppPropsWithLayout } from 'next/app'
import { SessionProvider, signIn, useSession } from 'next-auth/react'

import '@fortawesome/fontawesome-free/css/all.min.css'
import { useEffect } from 'react'
import Loading from '../components/Loading/Loading'
import Router from 'next/router'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const Layout = Component.layout || (({ children }) => <>{children}</>)

  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  )
}

const Auth = ({ children }: PropsWithChildren) => {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status, data: session } = useSession({ required: true })
  const isUser = !!session?.userInfo
  useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, status])
  if (isUser) {
    const { userInfo }: any = session
    if (userInfo == undefined) {
      Router.push('/login')
    }
    return children
  }
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loading />
}

export default MyApp
