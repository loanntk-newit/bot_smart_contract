import type { NextPageWithAuth } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { useEffect, useReducer, useState } from 'react'
import { ButtonBorderIndigo } from '../components/Button'
import { CardBorder } from '../components/Card'
import { BasicInput } from '../components/Form'
import Loading from '../components/Loading/Loading'
import useTitle from '../hooks/useTitle'
import Layout from '../layouts/Layout'
import _format from 'date-fns/format'
import useAxios from '../hooks/useAxios'
import { UserInfo } from '../models'
import * as yup from 'yup'

const initInputState = {
  input: {
    old_password: '',
    new_password: '',
    re_new_password: '',
  },
  errors: [],
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'refresh-data':
      state.input = { ...action.values }
      return { ...state }
    case 'change':
      state.input[action.key] = action.value
      return { ...state }
    case 'validation':
      return { ...state, errors: action.errors }
    case 'clear-validation':
      return { ...state, errors: [] }
  }
}

const ChangePassword: NextPageWithAuth = () => {
  const [state, dispatch] = useReducer(reducer, initInputState)
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const [err, setErr] = useState<String | null>(null)
  useTitle('Change Password')

  const {
    operation: change,
    data,
    loading: load,
  } = useAxios('/changePassword', 'POST', state.input)

  const changePassword = () => {
    setErr(null)
    let schema = yup.object().shape({
      old_password: yup.string().required().label('Old Password'),
      new_password: yup.string().required().label('New Password'),
      re_new_password: yup
        .string()
        .required()
        .oneOf([yup.ref('new_password'), null], 'Passwords must match')
        .label('Confirm Password'),
    })

    schema
      .validate(state.input, { abortEarly: false })
      .then(async () => {
        dispatch({ type: 'clear-validation' })
        change()
      })
      .catch((err) => {
        console.error(err)
        dispatch({ type: 'validation', errors: err.inner })
      })
  }

  useEffect(() => {
    const init = async () => {
      const session: any = await getSession()
      if (session && session?.userInfo) {
        setUserInfo(session.userInfo.user)
      }
    }
    init()
  }, [])

  useEffect(() => {
    if (data?.status === 'success') {
      alert('Your password has been changed. Please log in again!')
      signOut()
    } else {
      setErr(data?.err)
    }
  }, [data])

  return (
    <>
      {load && <Loading />}
      <div className="min-h-[calc(100vh-5rem)] ">
        <div className="mb-3">
          <h1 className="text-2xl">Welcome Back, {userInfo?.firstname}</h1>
          <span className="text-secondary">Here is the information about all your wallet</span>
        </div>
        <CardBorder>
          <>
            {/* Wallets */}
            <>
              <h2 className="text-2xl mb-2">Change Password</h2>
              <BasicInput
                label="Old Password"
                type="password"
                placeholder="Old Password"
                value={state.input.old_password}
                onChange={(e) =>
                  dispatch({
                    type: 'change',
                    key: 'old_password',
                    value: e.target.value,
                  })
                }
                error={
                  state.errors?.find((err: any) => err.path === 'old_password')?.message || err
                }
                required
              />
              <BasicInput
                label="New Password"
                type="password"
                placeholder="New Password"
                value={state.input.new_password}
                onChange={(e) =>
                  dispatch({
                    type: 'change',
                    key: 'new_password',
                    value: e.target.value,
                  })
                }
                error={state.errors?.find((err: any) => err.path === 'new_password')?.message}
                required
              />
              <BasicInput
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                value={state.input.re_new_password}
                onChange={(e) =>
                  dispatch({
                    type: 'change',
                    key: 're_new_password',
                    value: e.target.value,
                  })
                }
                error={state.errors?.find((err: any) => err.path === 're_new_password')?.message}
                required
              />

              <div className="py-8">
                <ButtonBorderIndigo
                  text="Change Password"
                  style=" ml-auto mr-0 sm:max-w-fit"
                  handleClick={() => changePassword()}
                />
              </div>
            </>
          </>
        </CardBorder>
      </div>
    </>
  )
}

ChangePassword.layout = Layout

ChangePassword.auth = {
  protected: true,
}

export default ChangePassword
