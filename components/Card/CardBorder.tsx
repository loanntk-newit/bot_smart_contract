import { ReactElement } from 'react'

interface Props {
  children: ReactElement
}

const CardBorder: React.FC<Props> = ({ children }) => {
  return <div className="p-5 border border-border rounded-xl">{children}</div>
}

export default CardBorder
