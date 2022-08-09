import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import 'rc-time-picker/assets/index.css'
import '../styles/globals.css'
import type { PropsWithChildren } from 'next'
import type { AppPropsWithLayout } from 'next/app'
import { SessionProvider, signIn, useSession } from 'next-auth/react'

import '@fortawesome/fontawesome-free/css/all.min.css'
import { useEffect } from 'react'
import Loading from '../components/Loading/Loading'
import Router from 'next/router'
import NotAuthorized from '../components/Authen/NotAuthorized'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const Layout = Component.layout || (({ children }) => <>{children}</>)

  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth roles={Component.auth.roles} registerStatus={Component.auth.registerStatus}>
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

const Auth = ({
  children,
  roles,
  registerStatus,
}: PropsWithChildren & { roles: string[] | undefined; registerStatus: number[] | undefined }) => {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status, data: session } = useSession({ required: true })
  const isUser = !!session?.user
  useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, status])
  if (isUser) {
    const { userInfo }: any = session
    const role = userInfo?.role?.name
    const register_status = parseInt(userInfo?.register_status)
    if (role == undefined) {
      Router.push('/login')
    }
    // If user is not in the list of roles
    if (roles && !roles.includes(role)) {
      return <NotAuthorized text="You are not authorized to access this page." />
    }
    if (parseInt(userInfo.role.id) === 3) {
      if (registerStatus && !registerStatus.includes(register_status)) Router.push('/status')
    } else {
      return <div>You are not authorized to access this page.</div>
    }
    return children
  }
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loading />
}

export default MyApp
