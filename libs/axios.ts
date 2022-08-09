import Axios from 'axios'
import { getSession } from 'next-auth/react'

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})

// request interceptor
axios.interceptors.request.use(
  async (request) => {
    const session: any = await getSession()

    if (session && session.userInfo.access_token) {
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${session.userInfo.access_token}`,
      }
    }
    return request
  },
  (error) => {
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error(`error`, error)
  }
)

export default axios
