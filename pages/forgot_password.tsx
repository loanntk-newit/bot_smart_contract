import type { NextPageWithAuth } from 'next'
import { ButtonPrimary } from '../components/Button'
import { useRouter } from 'next/router'
import { BasicInput } from '../components/Form'
import { useEffect, useReducer } from 'react'
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading/Loading'
import LayoutAuth from '../layouts/LayoutAuth'
import * as yup from 'yup'
import useTitle from '../hooks/useTitle'

const initInputState = {
  input: {
    email: '',
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

const ForgotPassword: NextPageWithAuth = () => {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initInputState)
  useTitle('Forgot Password')

  const {
    operation: sendCode,
    loading,
    data,
    error,
  } = useAxios('/forgot_password', 'POST', state.input)

  const handleSubmit = async () => {
    let input = {
      email: state.input.email,
    }

    let schema = yup.object().shape({
      email: yup.string().required('メールアドレス必須項目です。').label('メールアドレス'),
    })

    schema
      .validate(input, { abortEarly: false })
      .then(async () => {
        dispatch({ type: 'clear-validation' })
        await sendCode()
      })
      .catch((err) => {
        console.error(err)
        dispatch({ type: 'validation', errors: err.inner })
      })
  }

  useEffect(() => {
    if (data?.result_code == 'SUCCESS') {
      router.push('/success?forgot_password=true')
    }
  }, [data])

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
      {loading && <Loading />}
      <div className="w-full max-w-sm text-center">
        <BasicInput
          placeholder="メール"
          name={'email'}
          onChange={(e) => dispatch({ type: 'change', key: 'email', value: e.target.value })}
          error={state.errors?.find((err: any) => err.path === 'email')?.message}
        />
        {error && (
          <span className="text-red-500">{error.response?.data?.error_message?.message}</span>
        )}
        <ButtonPrimary text={'登録'} handleClick={handleSubmit} style=" max-w-[100px] py-2" />
      </div>
    </div>
  )
}

ForgotPassword.layout = LayoutAuth

export default ForgotPassword
