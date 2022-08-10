import type { NextPageWithAuth } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { ButtonBorder, ButtonBorderIndigo, ButtonBorderRed } from '../components/Button'
import { CardBorder } from '../components/Card'
import { BasicInput, InputAccount } from '../components/Form'
import Loading from '../components/Loading/Loading'
import useTitle from '../hooks/useTitle'
import Layout from '../layouts/Layout'
import _format from 'date-fns/format'
import useAxios from '../hooks/useAxios'

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
      state.input = { ...state.input, ...action.values }
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
  const [userInfo, setUserInfo] = useState({
    first_name: 'Peter',
    last_name: 'Wish',
    email: 'kml@gmail.com',
    expiredAt: 129924492,
  })
  useTitle('HOME')

  const {
    operation: getWallets,
    data: wallets,
    loading: loadedGet,
  } = useAxios('/wallets', 'GET', null)

  const {
    operation: postWallets,
    data: createWallet,
    loading: loadedCreate,
  } = useAxios('/wallets', 'POST', state.input)

  const { operation: deleteWallet, loading: loadedDelete } = useAxios('/wallets/', 'DELETE', null)

  const { operation: deleteAllWallet, loading: loadedDeleteAll } = useAxios(
    '/wallets/all',
    'DELETE',
    null
  )

  const handleCreateMore = useCallback(() => {
    let items = []
    let newItem = {
      commandId: null,
      id: new Date().getTime(),
      privateKey: '',
      userId: null,
    }
    for (let i = 0; i < Object.keys(state.input).length; i++) {
      items.push(state.input[i])
    }
    items.push(newItem)
    dispatch({ type: 'refresh-data', values: items })
  }, [state.input])

  const handleRemove = useCallback(
    (id: string) => {
      let items = []
      let newItems = Object.values(state.input).filter((el: any) => el.id !== id)
      for (let i = 0; i < newItems.length; i++) {
        items.push(newItems[i])
      }
      dispatch({ type: 'refresh-data', values: items })
    },
    [state.input]
  )

  useEffect(() => {
    getWallets()
  }, [])

  useEffect(() => {
    wallets &&
      dispatch({
        type: 'refresh-data',
        values: wallets,
      })
  }, [wallets])

  return (
    <>
      {(loadedGet || loadedCreate || loadedDelete || loadedDeleteAll) && <Loading />}
      <div className="min-h-[calc(100vh-5rem)] ">
        <div className="mb-3">
          <h1 className="text-2xl">Welcome Back, {userInfo.first_name}</h1>
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
                    <span>{`${userInfo.first_name} ${userInfo.last_name}`}</span>
                  </>
                </CardBorder>
                <CardBorder>
                  <>
                    <h3 className="text-xl">Ngày hết hạn</h3>
                    <span>{_format(userInfo.expiredAt, 'yyyy-mm-dd HH:mm:ss')}</span>
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
                    <a href="" className="text-indigo">
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
                  <InputAccount
                    key={`render-${state.input[i].id}`}
                    id={state.input[i].id ?? 0}
                    // type="password"
                    label={`Account ${i + 1}: `}
                    placeholder="Account privaryKey"
                    value={state.input[i].privateKey}
                    handleRemove={handleRemove}
                    onChange={(e) =>
                      dispatch({
                        type: 'change',
                        step: i,
                        key: 'privaryKey',
                        value: e.target.value,
                      })
                    }
                    required
                  />
                ))}
              <ButtonBorder
                text="Add account"
                icon="plus"
                style=" mx-auto"
                handleClick={handleCreateMore}
              />
              <div className="flex flex-col sm:flex-row gap-5 py-8">
                <ButtonBorderIndigo text="Submit" handleClick={handleCreateMore} />
                <ButtonBorderRed text="Remove All" handleClick={handleCreateMore} />
              </div>
            </>
          </>
        </CardBorder>
      </div>
    </>
  )
}

Home.layout = Layout

export default Home
