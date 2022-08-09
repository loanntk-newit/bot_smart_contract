import type { NextPageWithAuth } from 'next'
import { ButtonPrimary } from '../components/Button'
import { useRouter } from 'next/router'
import { InputPassword, BasicInput } from '../components/Form'
import { useEffect, useReducer, useState } from 'react'
import { getSession, signIn } from 'next-auth/react'
import Loading from '../components/Loading/Loading'
import LayoutAuth from '../layouts/LayoutAuth'
import * as yup from 'yup'
import Link from 'next/link'
import useTitle from '../hooks/useTitle'

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
  let callbackUrl: any = router.query.callbackUrl || '/mypage'
  useTitle('Login')

  const handleSubmit = async () => {
    setLoading(true)
    setMsg('')

    let input = {
      email: state.input.email,
      password: state.input.password,
    }

    let schema = yup.object().shape({
      email: yup.string().required('メールアドレス必須項目です。').label('メールアドレス'),
      password: yup
        .string()
        .required('パスワード必須項目です。')
        .min(6, 'パスワードが6以上の必要があります。')
        .label('パスワード'),
    })

    schema
      .validate(input, { abortEarly: false })
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
          const session: any = await getSession()
          if (session && session.userInfo) {
            if (session.userInfo.register_status == 3) {
              if (session.userInfo.is_update == 0) {
                callbackUrl = '/profile'
              }
            } else {
              callbackUrl = '/status'
            }
            router.push(callbackUrl)
            setLoading(false)
          }
        }
      })
      .catch((err) => {
        console.error(err)
        dispatch({ type: 'validation', errors: err.inner })
        setLoading(false)
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
        <p className="pb-6 font-normal text-[32px] items-center">ログイン</p>
        <BasicInput
          placeholder="メール"
          onChange={(e) => dispatch({ type: 'change', key: 'email', value: e.target.value })}
          error={state.errors?.find((err: any) => err.path === 'email')?.message}
        />
        <InputPassword
          placeholder="パスワード"
          onChange={(e) => dispatch({ type: 'change', key: 'password', value: e.target.value })}
          error={state.errors?.find((err: any) => err.path === 'password')?.message}
        />
        {msg && <div className="text-red-500 mb-3">{msg}</div>}
        <ButtonPrimary text={'ログイン'} handleClick={handleSubmit} style=" max-w-[100px] py-2" />
        <div className="pt-5">
          <Link href="/forgot_password">
            <span className="text-primary-origin cursor-pointer underline hover:underline-offset-1">
              パスワードをお忘れ方
            </span>
          </Link>
        </div>
        <div className="pt-5">
          <Link href="/">
            <span className="text-primary-origin cursor-pointer underline hover:underline-offset-1">
              TOPに戻る
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

Login.layout = LayoutAuth

export default Login
