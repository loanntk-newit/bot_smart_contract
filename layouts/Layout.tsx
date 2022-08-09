import type { PropsWithChildren } from 'next'
import Footer from '../components/Footers/Footer'
import Header from '../components/Headers/Header'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
