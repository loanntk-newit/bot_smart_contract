import type { NextPage, NextPageWithLayout } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement } from 'react'

declare module 'next' {
  type PropsWithChildren = {
    children: ReactElement
  }
  type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    layout?: ({ children }: PropsWithChildren) => ReactElement
    auth?: {
      protected: boolean
      roles?: string[]
      redirect?: string
    }
  }
}

declare module 'next/app' {
  type AppPropsWithLayout<P = {}> = AppProps<P> & {
    Component: NextPageWithLayout<P>
  }
}
