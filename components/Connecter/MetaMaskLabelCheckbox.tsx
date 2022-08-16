import { useEffect } from 'react'
import { hooks, metaMask } from '../../connectors/metaMask'
import { AccountLabelCheckbox } from './AccountLabelCheckbox'

interface Props {
  primaryKey: string
}

const { useProvider } = hooks

export default function MetaMaskLabelCheckbox({ primaryKey }: Props) {
  const provider = useProvider()
  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, [])

  return <AccountLabelCheckbox primaryKey={primaryKey} provider={provider} />
}
