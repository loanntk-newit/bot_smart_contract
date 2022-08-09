import axios, { Method } from 'axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { ListResponse, Response, ResponseError } from '../models'

const useAxios = (url: string, method: Method, body: any) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<ListResponse<any> | Response<any>>()
  const [error, setError] = useState<ResponseError | null>()
  const { status, data: session } = useSession()

  const operation = async () => {
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
        url: baseURL + url,
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

export default useAxios