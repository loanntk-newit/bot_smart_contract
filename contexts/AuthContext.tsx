import type { PropsWithChildren } from 'next'
import { createContext, useState } from 'react'

const AuthContext = createContext({})

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState({})

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
