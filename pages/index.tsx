import type { NextPageWithAuth } from 'next'
import { getSession } from 'next-auth/react'
import { useEffect, useReducer, useState } from 'react'
import { ButtonBorderRed } from '../components/Button'
import { CardBorder } from '../components/Card'
import { InputAccount } from '../components/Form'
import Loading from '../components/Loading/Loading'
import useTitle from '../hooks/useTitle'
import Layout from '../layouts/Layout'
import _format from 'date-fns/format'
import useAxios from '../hooks/useAxios'
import { UserInfo, Wallet } from '../models'
import * as yup from 'yup'
import MetaMask from '../components/Connecter/MetaMask'

const initInputState = {
  input: [
    {
      commandId: null,
      id: null,
      privateKey: '',
      userId: null,
    },
  ],
  errors: [],
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'refresh-data':
      state.input = { ...action.values }
      return { ...state }
    case 'change':
      state.input[action.step][action.key] = action.value
      return { ...state }
    case 'validation':
      return { ...state, errors: action.errors }
    case 'clear-validation':
      return { ...state, errors: [] }
  }
}

const Home: NextPageWithAuth = () => {
  const [state, dispatch] = useReducer(reducer, initInputState)
  const [userInfo, setUserInfo] = useState<UserInfo>()
  useTitle('HOME')

  const {
    operation: getWallets,
    data: wallets,
    loading: loadedGet,
  } = useAxios('/wallets', 'GET', null)

  const {
    operation: createWallet,
    data: dataCreate,
    loading: loadedCreate,
  } = useAxios('/wallets', 'POST', {
    privateKey: state.input[wallets && Object.keys(wallets).length]?.privateKey,
  })

  const {
    operation: deleteWallet,
    data: dataDel,
    loading: loadedDelete,
  } = useAxios('/wallets', 'DELETE', null)

  const {
    operation: deleteAllWallet,
    data: dataDelAll,
    loading: loadedDeleteAll,
  } = useAxios('/wallets/all', 'DELETE', null)

  const handleCreate = () => {
    let schema = yup.object().shape({
      privateKey: yup
        .string()
        .required()
        .length(64, 'Private key length is invalid!')
        .label('privateKey'),
    })

    schema
      .validate(
        { privateKey: state.input[wallets && Object.keys(wallets).length]?.privateKey },
        { abortEarly: false }
      )
      .then(async () => {
        dispatch({ type: 'clear-validation' })
        createWallet()
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
    getWallets()
  }, [dataCreate, dataDel, dataDelAll])

  useEffect(() => {
    if (wallets) {
      let items = []
      let newItem: Wallet = {
        id: new Date().getTime(),
        privateKey: '',
        userId: null,
        commandId: null,
      }
      for (let i = 0; i < Object.keys(wallets).length; i++) {
        items.push(wallets[i])
      }
      items.push(newItem)
      dispatch({ type: 'refresh-data', values: items })
    }
  }, [wallets])

  return (
    <>
      {(loadedGet || loadedCreate || loadedDelete || loadedDeleteAll) && <Loading />}
      <div className="min-h-[calc(100vh-5rem)] ">
        <div className="mb-3">
          <h1 className="text-2xl">Welcome Back, {userInfo?.firstname}</h1>
          <span className="text-secondary">Here is the information about all your wallet</span>
        </div>
        <CardBorder>
          <>
            {/* Billing */}
            <div className="mb-3">
              <h2 className="text-2xl mb-2">Billing</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-7">
                <CardBorder>
                  <>
                    <h3 className="text-xl">Username</h3>
                    <span>{`${userInfo?.firstname} ${userInfo?.lastname}`}</span>
                  </>
                </CardBorder>
                <CardBorder>
                  <>
                    <h3 className="text-xl">Ngày hết hạn</h3>
                    <span>{userInfo?.expiredAt?.toString()}</span>
                  </>
                </CardBorder>
                <CardBorder>
                  <>
                    <h3 className="text-xl">Gia hạn</h3>
                    <span>
                      Liên hệ{' '}
                      <a href="" className="text-indigo">
                        LeonardoDN
                      </a>{' '}
                      hoặc tham gia group{' '}
                      <a href="" className="text-indigo">
                        gemslab
                      </a>
                    </span>
                  </>
                </CardBorder>
                <CardBorder>
                  <>
                    <h3 className="text-xl">Action</h3>
                    <a href="/change_password" className="text-indigo">
                      Change Password
                    </a>
                  </>
                </CardBorder>
              </div>
            </div>
            {/* Wallets */}
            <>
              <h2 className="text-2xl mb-2">Wallets</h2>
              {state.input &&
                Object.values(state.input).map((data, i) => (
                  <div key={`render-${state.input[i].id}`}>
                    <InputAccount
                      id={state.input[i].id ?? 0}
                      // type="password"
                      label={`Account ${i + 1}: `}
                      placeholder="Account privateKey"
                      value={state.input[i].privateKey}
                      handleRemove={deleteWallet}
                      handleAdd={handleCreate}
                      handleChange={(e) =>
                        dispatch({
                          type: 'change',
                          step: i,
                          key: 'privateKey',
                          value: e.target.value,
                        })
                      }
                      disabled={wallets && !!wallets[i]?.privateKey}
                      required
                    />
                    {wallets && <MetaMask primaryKey={wallets[i]?.privateKey} />}
                  </div>
                ))}
              {state.errors && (
                <span className="text-red mb-3">
                  {state.errors?.find((err: any) => err.path === 'privateKey')?.message}
                </span>
              )}

              <div className="py-8">
                <ButtonBorderRed
                  text="Remove All"
                  style=" ml-auto mr-0 sm:max-w-fit"
                  handleClick={() => deleteAllWallet()}
                />
              </div>
            </>
          </>
        </CardBorder>
      </div>
    </>
  )
}

Home.layout = Layout

Home.auth = {
  protected: true,
}

export default Home
