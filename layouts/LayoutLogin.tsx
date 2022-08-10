import { ReactElement } from 'react'
import Header from '../components/Headers/Header'

type LayoutProps = {
  children: ReactElement
}

const LayoutLogin = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="pt-20 px-2 w-full">
        <div className="container px-4 mx-auto">{children}</div>
      </main>
    </>
  )
}

export default LayoutLogin
