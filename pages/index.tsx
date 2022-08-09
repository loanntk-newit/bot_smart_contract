import type { NextPageWithAuth } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ButtonPrimary } from '../components/Button'
import Loading from '../components/Loading/Loading'
import useTitle from '../hooks/useTitle'
import LayoutAuth from '../layouts/LayoutAuth'

const Home: NextPageWithAuth = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  useTitle('')

  const handleRegister = () => {
    router.push('/register')
  }

  const handleMyPage = async () => {
    setLoading(true)
    const session: any = await getSession()
    let callbackUrl = '/login'
    if (session && session?.userInfo) {
      session?.userInfo?.is_update == 0 ? (callbackUrl = '/profile') : (callbackUrl = '/mypage')
    }
    router.push(callbackUrl)
    setLoading(false)
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex justify-center">
      {loading && <Loading />}
      <div className="flex flex-col justify-center items-center gap-4">
        <ButtonPrimary handleClick={handleMyPage} text={'マイページログイン'}></ButtonPrimary>
        <ButtonPrimary handleClick={handleRegister} text={'面談申し込み'}></ButtonPrimary>
      </div>
    </div>
  )
}

Home.layout = LayoutAuth

export default Home
