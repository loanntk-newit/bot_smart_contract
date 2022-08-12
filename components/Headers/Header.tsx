import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
      <div className="container px-4 mx-auto">
        <Link href="/">
          <div className="flex gap-x-4 items-center justify-center">
            <img src="/imgs/logo.svg" alt="Logo" />
            <h1 className="font-medium text-xl ">Logo</h1>
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default Header
