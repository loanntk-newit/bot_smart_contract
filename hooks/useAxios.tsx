import axios, { Method } from 'axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const useAxios = (url: string, method: Method, body: any) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState()
  const [error, setError] = useState<any | null>()
  const { status, data: session } = useSession()

  const operation = async (param?: string | number | null) => {
    setLoading(true)
    setError(null)
    try {
      let config
      if (session) {
        const { userInfo }: any = session
        const access_token = userInfo?.access_token
        config = {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      }
      const result = await axios.request({
        url: param ? baseURL + url + '/' + param : baseURL + url,
        method: method,
        data: body,
        ...config,
      })
      const data = result?.data
      setData(data)
    } catch (err: any) {
      setError(err)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  return { operation, data, error, loading }
}

// kdc90298793c8a6d645dee50988cab3e5bd3422ecbe88de7507de5a42ff091hu

export default useAxios
