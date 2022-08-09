import { ReactElement } from 'react'
import { SideBar } from '../components/Sidebar'

type LayoutProps = {
  children: ReactElement
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex">
      <SideBar />
      <main className="pt-20 px-2 w-full">
        <div className="container px-4 mx-auto">{children}</div>
      </main>
    </div>
  )
}

export default Layout
