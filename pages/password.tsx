import type { NextPageWithAuth } from 'next'
import { ButtonPrimary } from '../components/Button'
import { useRouter } from 'next/router'
import { InputPassword } from '../components/Form'
import { useEffect, useReducer } from 'react'
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading/Loading'
import LayoutAuth from '../layouts/LayoutAuth'
import * as yup from 'yup'
import useTitle from '../hooks/useTitle'

const initInputState = {
  input: {
    email: '',
    code: '',
    password: '',
    password_confirmation: '',
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

const Password: NextPageWithAuth = () => {
  const router = useRouter()
  const email = router.query.email?.toString() ?? ''
  const code = router.query.code?.toString() ?? ''
  const [state, dispatch] = useReducer(reducer, initInputState)
  useTitle('Change Password')

  const {
    operation: setNewPassword,
    loading,
    data,
    error,
  } = useAxios('/set_new_password', 'POST', state.input)

  const handleSubmit = async () => {
    state.input.email = email
    state.input.code = code

    let input = {
      email: state.input.email,
      code: state.input.code,
      password: state.input.password,
      password_confirmation: state.input.password_confirmation,
    }

    let schema = yup.object().shape({
      code: yup.string().required('Code必須項目です。').label('Code'),
      email: yup.string().required('メールアドレス必須項目です。').label('メールアドレス'),
      password: yup
        .string()
        .required('パスワード必須項目です。')
        .min(6, 'パスワードが6以上の必要があります。')
        .label('パスワード'),
      password_confirmation: yup
        .string()
        .required('パスワード確認必須項目です。')
        .oneOf(
          [yup.ref('password'), null],
          'パスワード確認とパスワードには同じ値を指定してください。'
        )
        .min(6, 'パスワード確認が6以上の必要があります。')
        .label('パスワード確認'),
    })

    schema
      .validate(input, { abortEarly: false })
      .then(async () => {
        dispatch({ type: 'clear-validation' })
        await setNewPassword()
      })
      .catch((err) => {
        console.error(err)
        dispatch({ type: 'validation', errors: err.inner })
      })
  }

  useEffect(() => {
    if (data?.result_code == 'SUCCESS') {
      router.push('/login')
    }
  }, [data])

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
      {loading && <Loading />}
      <div className="w-full max-w-sm text-center">
        <p className="pb-6">メール：{email}</p>
        <InputPassword
          placeholder="パスワード入力"
          name={'password'}
          onChange={(e) => dispatch({ type: 'change', key: 'password', value: e.target.value })}
          error={state.errors?.find((err: any) => err.path === 'password')?.message}
        />
        <InputPassword
          placeholder="パスワード入力確認"
          name="password_confirmation"
          onChange={(e) =>
            dispatch({ type: 'change', key: 'password_confirmation', value: e.target.value })
          }
          error={state.errors?.find((err: any) => err.path === 'password_confirmation')?.message}
        />
        <div>
          {state.errors && (
            <p className="text-red-500">
              {state.errors?.find((err: any) => err.path === 'email')?.message}
            </p>
          )}

          {state.errors && (
            <p className="text-red-500">
              {state.errors?.find((err: any) => err.path === 'code')?.message}
            </p>
          )}

          {error && (
            <span className="text-red-500">{error.response?.data?.error_message?.message}</span>
          )}
        </div>
        <ButtonPrimary text={'登録'} handleClick={handleSubmit} style=" max-w-[100px] py-2" />
      </div>
    </div>
  )
}

Password.layout = LayoutAuth

export default Password
