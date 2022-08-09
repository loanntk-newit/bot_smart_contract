import { Menu, Transition } from '@headlessui/react'
import { signOut, useSession } from 'next-auth/react'
import { Fragment } from 'react'

export default function Example() {
  const { data: session } = useSession()
  return (
    <div className="relative">
      <Menu>
        <Menu.Button>
          <img src="/img/avatar.png" alt="avatar" className="max-h-[50px]" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y rounded-md bg-white shadow-lg min-w-[200px]">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <span className="px-2 py-2 text-sm">{session?.user?.name}</span>
              </Menu.Item>
              <Menu.Item>
                <button onClick={() => signOut()} className="w-full">
                  <span className="hover:bg-primary-dark hover:text-white flex w-full rounded-md px-2 py-2 text-sm cursor-pointer">
                    Logout
                  </span>
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
