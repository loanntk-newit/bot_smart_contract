import Link from 'next/link'
import LayoutAuth from '../../layouts/LayoutAuth'

interface Props {
  text: string
}

const NotAuthorized: React.FC<Props> = ({ text }) => {
  return (
    <LayoutAuth>
      <div className="min-h-[calc(100vh-5rem)] flex justify-center items-center">
        <div className="text-center">
          <div className="px-2">{text}</div>
          <Link href="/" className="px-2">
            <span className="text-primary-origin cursor-pointer underline hover:underline-offset-">
              TOPに戻る
            </span>
          </Link>
        </div>
      </div>
    </LayoutAuth>
  )
}

export default NotAuthorized
