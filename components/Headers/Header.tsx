import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { MenuDropdown } from '../Dropdowns'

const Header = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  const { data: session } = useSession()
  return (
    <>
      {session && session.user && (
        <>
          <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
              <div className="w-full relative flex justify-between sm:w-auto sm:static sm:block sm:justify-start">
                <Link href="/">
                  <img src="/img/logo.png" alt="Logo" className="max-h-9 cursor-pointer" />
                </Link>
                <button
                  className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block sm:hidden outline-none focus:outline-none"
                  type="button"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  <i className="fas fa-bars"></i>
                </button>
              </div>
              <div
                className={
                  'sm:flex flex-grow items-center bg-white sm:bg-opacity-0 sm:shadow-none' +
                  (navbarOpen ? ' block' : ' hidden')
                }
                id="example-navbar-warning"
              >
                <ul className="flex flex-col sm:flex-row list-none sm:ml-auto mt-3 sm:mt-0">
                  <li className="hidden sm:flex items-center">
                    <MenuDropdown />
                  </li>
                  <li className="flex sm:hidden items-center w-full">
                    <span className="px-3 py-4 sm:py-2 flex items-center text-xs uppercase font-bold">
                      {session?.user?.name}
                    </span>
                  </li>
                  <li className="flex sm:hidden items-center rounded w-full hover:bg-primary-dark hover:text-white">
                    <button onClick={() => signOut()}>
                      <span className="px-3 py-4 sm:py-2 flex items-center text-xs uppercase font-bold cursor-pointer">
                        Logout
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      )}
      {!session && (
        <>
          <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
            <div className="container px-4 mx-auto">
              <Link href="/">
                <img src="/img/logo.png" alt="Logo" className="max-h-9 cursor-pointer mx-auto" />
              </Link>
            </div>
          </nav>
        </>
      )}
    </>
  )
}

export default Header
