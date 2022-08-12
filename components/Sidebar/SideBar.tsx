import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { MenuItem } from '.'
import { Menus } from '../../stores/Menus'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const SideBar: React.FC<Props> = ({ open, setOpen }) => {
  const router = useRouter()
  const active = router.pathname ?? '/'

  return (
    <div
      className={` ${
        open ? 'w-40' : 'w-20 '
      } fixed flex flex-col justify-between h-auto min-h-screen p-5 pt-8 pr-0 duration-300 border border-border bg-white`}
    >
      <div className={`absolute cursor-pointer -right-3 top-9 w-7 ${!open && 'rotate-180'}`}>
        <img src="/imgs/arrow-left.svg" alt="" onClick={() => setOpen(!open)} />
      </div>
      <div>
        <div className="flex gap-x-4 items-center">
          <img src="/imgs/logo.svg" alt="Logo" />
          <h1 className={`font-medium text-xl duration-200 ${!open && 'scale-0'}`}>Logo</h1>
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <MenuItem
              key={`menu-${index}`}
              name={menu.title}
              icon={menu.icon}
              src={menu.src}
              display={open}
              urls={active}
            />
          ))}
        </ul>
      </div>
      <div>
        <li className={`flex p-2 cursor-pointer items-center gap-x-4 mt-2 text-red`}>
          <a href={'/logout'} className="flex items-center gap-4">
            <img src={`/imgs/logout.svg`} alt={'Logout'} />
            <span className={`${!open && 'hidden'} duration-200 `}>Logout</span>
          </a>
        </li>
      </div>
    </div>
  )
}

export default SideBar
