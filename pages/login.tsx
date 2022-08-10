import type { NextPageWithAuth } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useReducer, useState } from 'react'
import { getSession, signIn } from 'next-auth/react'
import Loading from '../components/Loading/Loading'
import * as yup from 'yup'
import useTitle from '../hooks/useTitle'
import { BasicInput } from '../components/Form'
import { ButtonBorder, ButtonBorderIndigo } from '../components/Button'
import useAxios from '../hooks/useAxios'
import LayoutLogin from '../layouts/LayoutLogin'

const initInputState = {
  input: {
    email: '',
    password: '',
  },
  errors: [],
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'change':
      state.input[action.key] = action.value
      return { ...state }
    case 'validation':
      return { ...state, errors: action.errors }
    case 'clear-validation':
      return { ...state, errors: [] }
  }
}

const Login: NextPageWithAuth = () => {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initInputState)
  const [loading, setLoading] = useState<boolean>(false)
  const [msg, setMsg] = useState<string | null>(null)
  useTitle('LOGIN')

  const handleSubmit = async () => {
    setMsg('')

    let schema = yup.object().shape({
      email: yup.string().required().label('Email'),
      password: yup.string().required().label('Password'),
    })

    schema
      .validate(state.input, { abortEarly: false })
      .then(async () => {
        dispatch({ type: 'clear-validation' })
        const res = await signIn('credentials', {
          redirect: false,
          username: state.input.email,
          password: state.input.password,
        })
        if (res?.error) {
          const status = res.status
          if (status == 401) setMsg('メールアドレスまたはパスワードが間違っています！')
          else if (status != 200) setMsg(res.error)
          setLoading(false)
        }
        if (res?.ok) {
          router.push('/')
          setLoading(false)
        }
      })
      .catch((err) => {
        console.error(err)
        dispatch({ type: 'validation', errors: err.inner })
      })
  }

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        handleSubmit()
      }
    }
    document.addEventListener('keydown', keyDownHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
      {loading && <Loading />}
      <div className="w-full max-w-sm text-center">
        <p className="pb-6 text-indigo font-bold text-[32px] items-center">LOGIN</p>
        <BasicInput
          label="Email"
          placeholder="olivier@mail.com"
          onChange={(e) => dispatch({ type: 'change', key: 'email', value: e.target.value })}
          error={state.errors?.find((err: any) => err.path === 'email')?.message}
        />
        <BasicInput
          label="Password"
          type="password"
          onChange={(e) => dispatch({ type: 'change', key: 'password', value: e.target.value })}
          error={state.errors?.find((err: any) => err.path === 'password')?.message}
        />
        {msg && <div className="text-red-500 mb-3">{msg}</div>}
        <ButtonBorderIndigo
          text={'Login'}
          handleClick={handleSubmit}
          style=" max-w-[100px] py-2 mx-auto"
        />
      </div>
    </div>
  )
}

Login.layout = LayoutLogin

export default Login
