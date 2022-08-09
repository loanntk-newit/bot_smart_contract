import type { NextPageWithAuth } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ButtonBorder } from '../components/Button'
import { CardBorder } from '../components/Card'
import { BasicInput } from '../components/Form'
import Loading from '../components/Loading/Loading'
import useTitle from '../hooks/useTitle'
import Layout from '../layouts/Layout'

const Home: NextPageWithAuth = () => {
  // const router = useRouter()
  // const [loading, setLoading] = useState<boolean>(false)
  // useTitle('')

  // const handleRegister = () => {
  //   router.push('/register')
  // }

  // const handleMyPage = async () => {
  //   setLoading(true)
  //   const session: any = await getSession()
  //   let callbackUrl = '/login'
  //   if (session && session?.userInfo) {
  //     session?.userInfo?.is_update == 0 ? (callbackUrl = '/profile') : (callbackUrl = '/mypage')
  //   }
  //   router.push(callbackUrl)
  //   setLoading(false)
  // }

  return (
    <div className="min-h-[calc(100vh-5rem)] ">
      <div className="mb-3">
        <h1 className="text-2xl">Welcome Back, Marci</h1>
        <span className="text-secondary">Here is the information about all your orders</span>
      </div>
      <CardBorder>
        <>
          {/* Billing */}
          <div className="mb-3">
            <h2 className="text-2xl mb-2">Billing</h2>
            <div className="grid grid-cols-4 gap-7">
              <CardBorder>
                <>
                  <h3 className="text-xl">Username</h3>
                  <span>manhvu2991</span>
                </>
              </CardBorder>
              <CardBorder>
                <>
                  <h3 className="text-xl">Ngày hết hạn</h3>
                  <span>2022-08-15 15:41:32</span>
                </>
              </CardBorder>
              <CardBorder>
                <>
                  <h3 className="text-xl">Gia hạn</h3>
                  <span>
                    Liên hệ
                    <a href="" className="text-indigo">
                      LeonardoDN
                    </a>
                    hoặc tham gia group
                    <a href="" className="text-indigo">
                      gemslab
                    </a>
                  </span>
                </>
              </CardBorder>
              <CardBorder>
                <>
                  <h3 className="text-xl">Action</h3>
                  <a href="" className="text-indigo">
                    Change Password
                  </a>
                </>
              </CardBorder>
            </div>
          </div>
          {/* Wallets */}
          <>
            <h2 className="text-2xl mb-2">Wallets</h2>
            <BasicInput
              type="password"
              label="Account 1:"
              placeholder="Account privaryKey"
              note="Address: N/A - Balance: N/A BNB"
              required
            />
            <ButtonBorder text="Add account" icon="plus" style=" mx-auto" />
          </>
        </>
      </CardBorder>
    </div>
  )
}

Home.layout = Layout

export default Home
