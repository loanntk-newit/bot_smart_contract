import { useEffect } from 'react'
import { hooks, metaMask } from '../../connectors/metaMask'
import { Accounts } from './Account'

interface Props {
  primaryKey: string
}

const { useProvider } = hooks

export default function MetaMask({ primaryKey }: Props) {
  const provider = useProvider()
  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, [])

  return <Accounts primaryKey={primaryKey} provider={provider} />
}
