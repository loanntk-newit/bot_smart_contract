import Link from 'next/link'
import { useState } from 'react'
import { MenuItem } from '.'
import { Menus } from '../../stores/Menus'

const SideBar = () => {
  const [open, setOpen] = useState<boolean>(true)
  const [active, setActive] = useState<string>('account')

  return (
    <div
      className={` ${
        open ? 'w-72' : 'w-20 '
      } h-auto min-h-screen p-5 pt-8 pr-0 relative duration-300 border border-border`}
    >
      <div className={`absolute cursor-pointer -right-3 top-9 w-7 ${!open && 'rotate-180'}`}>
        <img src="/imgs/arrow-left.svg" alt="" onClick={() => setOpen(!open)} />
      </div>

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
            onClick={() => setActive(menu.src)}
          />
        ))}
      </ul>
    </div>
  )
}

export default SideBar
