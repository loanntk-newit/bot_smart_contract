import { ReactElement, useState } from 'react'
import { SideBar } from '../components/Sidebar'

type LayoutProps = {
  children: ReactElement
}

const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = useState<boolean>(true)
  return (
    <div className="flex">
      <SideBar open={open} setOpen={setOpen} />
      <main className={`${open ? 'sm:pl-40' : 'pl-20 '} pt-20 px-2 w-full`}>
        <div className="container px-4 mx-auto">{children}</div>
      </main>
    </div>
  )
}

export default Layout
