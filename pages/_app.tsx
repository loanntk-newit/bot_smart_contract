import '../styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import type { PropsWithChildren } from 'next'
import type { AppPropsWithLayout } from 'next/app'
import { useEffect } from 'react'
import { SessionProvider, signIn, useSession } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const Layout = Component.layout || (({ children }) => <>{children}</>)

  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth roles={Component.auth.roles}>
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

const Auth = ({ children, roles }: PropsWithChildren & { roles: string[] | undefined }) => {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status, data: session } = useSession({ required: true })

  const isUser = !!session?.user

  useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, status])

  if (isUser) {
    const { userInfo }: any = session
    const role = userInfo.role.name

    // If user is not in the list of roles
    if (roles && !roles.includes(role)) {
      return <div>You are not authorized to access this page.</div>
    }

    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}

export default MyApp
