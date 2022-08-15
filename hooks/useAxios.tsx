import axios, { Method } from 'axios'
import { getSession } from 'next-auth/react'
import { useState } from 'react'

const useAxios = (url: string, method: Method, body: any) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>()
  const [error, setError] = useState<any | null>()

  const operation = async (param?: string | number | null) => {
    setLoading(true)
    setError(null)
    try {
      const session = await getSession()
      let config
      if (session) {
        const { userInfo }: any = session
        const accessToken = userInfo?.accessToken
        config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
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

export default useAxios
