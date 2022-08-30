import type { NextPageWithAuth } from 'next'
import { getSession } from 'next-auth/react'
import { useEffect, useReducer, useState } from 'react'
import { ButtonBorderIndigo, ButtonBorderRed } from '../components/Button'
import { CardBorder } from '../components/Card'
import { AccountCheckboxGroup, BasicCheckboxGroup, BasicInput } from '../components/Form'
import Loading from '../components/Loading/Loading'
import useTitle from '../hooks/useTitle'
import Layout from '../layouts/Layout'
import _format from 'date-fns/format'
import useAxios from '../hooks/useAxios'
import { UserInfo } from '../models'
import * as yup from 'yup'
import { TimeStarts } from '../stores/TimeStarts'

const initInputState = {
  input: {
    saleAddress: '',
    bnbAmount: 0,
    gasPrice: 0,
    gasLimit: 0,
    timeStarts: [],
    walletIds: [],
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

const DxSale: NextPageWithAuth = () => {
  const [state, dispatch] = useReducer(reducer, initInputState)
  const [userInfo, setUserInfo] = useState<UserInfo>()
  useTitle('Dx Sale')

  const {
    operation: getWallets,
    data: wallets,
    loading: loadedGet,
  } = useAxios('/wallets', 'GET', null)

  const {
    operation: startCommand,
    data: startBuyCommand,
    loading: loadedStart,
  } = useAxios('/command/buy', 'POST', state.input)

  const {
    operation: stopCommand,
    data: stopBuyCommand,
    loading: loadedStop,
  } = useAxios('/command/stop', 'POST', null)

  const handleBuy = () => {
    let schema = yup.object().shape({
      saleAddress: yup.string().required().label('Presale Contract'),
      bnbAmount: yup.string().required().label('BNB Amount'),
      gasPrice: yup.number().required().label('Gas Price'),
      gasLimit: yup.number().required().label('Gas Limit'),
    })

    schema
      .validate(state.input, { abortEarly: false })
      .then(async () => {
        dispatch({ type: 'clear-validation' })
        startCommand()
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
      getWallets()
    }
    init()
  }, [])

  useEffect(() => {
    if (startBuyCommand) alert('Start Buy Command is successfully!')
  }, [startBuyCommand])

  useEffect(() => {
    if (stopBuyCommand) alert('Stop Buy Command is successfully!')
  }, [stopBuyCommand])

  return (
    <>
      {(loadedGet || loadedStart || loadedStop) && <Loading />}
      <div className="min-h-[calc(100vh-5rem)] ">
        <div className="mb-3">
          <h1 className="text-2xl">Welcome Back, {userInfo?.firstname}</h1>
          <span className="text-secondary">Here is the information about all your wallet</span>
        </div>
        <CardBorder>
          <>
            <h1 className="text-2xl">DxSale</h1>
            <div className="grid sm:grid-cols-3 gap-6 mb-3">
              <div className="sm:col-span-2">
                <CardBorder>
                  <>
                    <BasicInput
                      label="Presale Contract"
                      placeholder="0xaCD....."
                      value={state.input.saleAddress ?? ''}
                      required
                      onChange={(e) =>
                        dispatch({
                          type: 'change',
                          key: 'saleAddress',
                          value: e.target.value,
                        })
                      }
                      error={state.errors?.find((err: any) => err.path === 'saleAddress')?.message}
                    />
                    {/* <div className="flex flex-col md:flex-row justify-between mb-3">
                      <span>
                        <b>Start at:</b> 05 Aug 2022 at 07:00 pm
                      </span>
                      <span>
                        <b>Countdown:</b> 3:5:49:12
                      </span>
                    </div> */}
                    <BasicInput
                      type="number"
                      label="BNB amount"
                      placeholder="0.0001"
                      value={state.input.bnbAmount ?? 0}
                      required
                      onChange={(e) =>
                        dispatch({
                          type: 'change',
                          key: 'bnbAmount',
                          value: e.target.value,
                        })
                      }
                      error={state.errors?.find((err: any) => err.path === 'bnbAmount')?.message}
                    />
                    <BasicInput
                      type="number"
                      label="Gas price"
                      placeholder="10"
                      value={state.input.gasPrice ?? 0}
                      required
                      onChange={(e) =>
                        dispatch({
                          type: 'change',
                          key: 'gasPrice',
                          value: e.target.value,
                        })
                      }
                      error={state.errors?.find((err: any) => err.path === 'gasPrice')?.message}
                    />
                    <BasicInput
                      type="number"
                      label="Gas limit (gwei)"
                      placeholder="400000"
                      value={state.input.gasLimit ?? 0}
                      required
                      onChange={(e) =>
                        dispatch({
                          type: 'change',
                          key: 'gasLimit',
                          value: e.target.value,
                        })
                      }
                      error={state.errors?.find((err: any) => err.path === 'gasLimit')?.message}
                    />
                    <span className="my-3">Buy when sale start</span>
                    <BasicCheckboxGroup
                      name={'timeStarts'}
                      label={'By at'}
                      options={TimeStarts}
                      onChange={(e) =>
                        dispatch({
                          type: 'change',
                          key: 'timeStarts',
                          value: e,
                        })
                      }
                    />
                    <div className="flex sm:flex-row flex-col justify-end gap-5 py-8">
                      <ButtonBorderIndigo
                        text="Buy"
                        style=" sm:max-w-fit"
                        handleClick={() => handleBuy()}
                      />
                      <ButtonBorderRed
                        text="Stop"
                        style=" sm:max-w-fit"
                        handleClick={() => stopCommand()}
                      />
                    </div>
                  </>
                </CardBorder>
              </div>
              <div className="sm:col-span-1">
                <CardBorder>
                  <>
                    <h2 className="text-2xl mb-2">Account</h2>
                    <AccountCheckboxGroup
                      name={'account'}
                      label={'id'}
                      options={wallets}
                      data={state.input.walletIds}
                      onChange={(e: any) => {
                        dispatch({
                          type: 'change',
                          key: 'walletIds',
                          value: e,
                        })
                      }}
                    />
                  </>
                </CardBorder>
              </div>
            </div>
          </>
        </CardBorder>
      </div>
    </>
  )
}

DxSale.layout = Layout

DxSale.auth = {
  protected: true,
}

export default DxSale
