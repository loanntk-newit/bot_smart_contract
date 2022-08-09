import React, { ReactElement } from 'react'

// components

import Navbar from '../components/Navbars/AuthNavbar'
import FooterSmall from '../components/Footers/FooterSmall'

type LayoutProps = {
  children: ReactElement
}

export default function Auth({ children }: LayoutProps) {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-slate-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}
          ></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  )
}
