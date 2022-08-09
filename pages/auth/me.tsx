import { NextPageWithLayout } from 'next'
import React, { useEffect } from 'react'
import Layout from '../../layouts/Layout'
import axios from '../../libs/axios'

const Me: NextPageWithLayout = () => {
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const response = await axios.get('/me')
    console.log(response)
  }
  return <div>Me</div>
}

Me.layout = Layout

Me.auth = {
  protected: true,
}

export default Me
