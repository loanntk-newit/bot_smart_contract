import type { NextPageWithAuth } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTitle from '../hooks/useTitle'
import LayoutAuth from '../layouts/LayoutAuth'

const Success: NextPageWithAuth = () => {
  const router = useRouter()
  const param = router.query.forgot_password
  useTitle('Success')
  return (
    <div className="min-h-[calc(100vh-5rem)] flex justify-center items-center">
      <div className="text-center">
        {param && <div className="px-2">メールを確認してください。</div>}
        {!param && <div className="px-2">メールを確認してパスワードを設定する。</div>}
        <Link href="/" className="px-2">
          <span className="text-primary-origin cursor-pointer underline hover:underline-offset-">
            TOPに戻る
          </span>
        </Link>
      </div>
    </div>
  )
}

Success.layout = LayoutAuth

export default Success
