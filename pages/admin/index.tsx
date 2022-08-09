import { useSession, signIn, signOut } from 'next-auth/react'

export default function Admin() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(session, null, 2) }} />
        {/* Signed in as {session.user.email} <br /> */}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

Admin.auth = {
  protected: true,
  roles: ['admin'],
}
