import Link from 'next/link'

interface Props {
  name?: string
  icon?: string
  src?: string
  display?: boolean
  urls?: string
  onClick?: () => void
}

const MenuItem: React.FC<Props> = ({ name, icon, display, urls, src, onClick }) => {
  let active = urls === src
  return (
    <li
      className={`flex p-2 cursor-pointer items-center gap-x-4 mt-2 hover:text-indigo text-secondary ${
        active && 'text-indigo border-r-4 border-indigo'
      }`}
      onClick={onClick}
    >
      {/* <a href={src ?? '/'} className="flex items-center gap-4"> */}
      <img src={active ? `/imgs/${icon}-active.svg` : `/imgs/${icon}.svg`} alt={name} />
      <span className={`${!display && 'hidden'} duration-200 `}>{name}</span>
      {/* </a> */}
    </li>
  )
}

export default MenuItem
