import type { BigNumber } from '@ethersproject/bignumber'
import type { Web3ReactHooks } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import { useEffect, useState } from 'react'

const privateKeyToAddress = (str: string) => {
  const privateKeyToAddr = require('ethereum-private-key-to-address')
  try {
    return privateKeyToAddr(str)
  } catch (err) {
    return 'N/A'
  }
}

const ellipsis = (str: string) => {
  if (str.length > 20) {
    const start = str.slice(0, 4)
    const end = str.slice(-5)
    return start.concat('...').concat(end)
  } else {
    return str
  }
}

function useBalances(
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  primaryKey?: string
): BigNumber | undefined {
  const [balances, setBalances] = useState<BigNumber | undefined>()

  useEffect(() => {
    if (provider && primaryKey) {
      let stale = false
      let account = privateKeyToAddress(primaryKey)

      const getBalance = async () => {
        await provider
          .getBalance(account)
          .then((balances) => {
            if (stale) return
            setBalances(balances)
          })
          .catch((err) => {})
      }
      getBalance()

      return () => {
        stale = true
        setBalances(undefined)
      }
    }
  }, [provider, primaryKey])
  return balances
}

export function AccountLabelCheckbox({
  primaryKey,
  provider,
}: {
  primaryKey: string
  provider: ReturnType<Web3ReactHooks['useProvider']>
}) {
  const balances = useBalances(provider, primaryKey)

  if (primaryKey === undefined) return null

  return (
    <>
      {ellipsis(privateKeyToAddress(primaryKey)) ?? 'N/A'} -&nbsp;
      {balances ? formatEther(balances) : 'N/A'} <b>BNB</b>
    </>
  )
}
