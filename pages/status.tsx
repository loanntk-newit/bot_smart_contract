import type { NextPageWithAuth } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading/Loading'
import useTitle from '../hooks/useTitle'
import LayoutAuth from '../layouts/LayoutAuth'

const Status: NextPageWithAuth = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [status, setStatus] = useState<string>()
  let callbackUrl: any = router.query.callbackUrl || '/mypage'

  useTitle('Status')

  useEffect(() => {
    const init = async () => {
      const session: any = await getSession()
      const { userInfo } = session
      switch (parseInt(userInfo.register_status)) {
        case 1:
          setStatus('面談')
          break
        case 2:
          setStatus('研修')
          break
        case 3:
          setStatus('詳細登録')
          if (userInfo.is_update == 0) {
            callbackUrl = '/profile'
          }
          router.push(callbackUrl)
          break
        default:
          break
      }
      setLoading(false)
    }
    init()
  }, [])

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center py-8">
      {loading && <Loading />}
      <div className="flex flex-col w-full justify-between text-center gap-10">
        <h1 className="font-bold text-[32px]">マイページ</h1>
        <span>
          現在は
          <b className="text-2xl font-bold">{status}</b>
          になっております。
        </span>
        <span>
          面談の日程はメールにてご連絡いたします。
          <br />
          少々お待ちください。
        </span>
      </div>
    </div>
  )
}

Status.layout = LayoutAuth

Status.auth = {
  protected: true,
  roles: ['concierge'],
}

export default Status
