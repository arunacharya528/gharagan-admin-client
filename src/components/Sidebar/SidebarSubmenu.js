import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DropdownIcon } from '../../icons'
import * as Icons from '../../icons'
import { Transition } from '@windmill/react-ui'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { Route } from 'react-router-dom'

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarSubmenu({ route }) {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false)
  const location = useLocation();
  function handleDropdownMenuClick() {
    setIsDropdownMenuOpen(!isDropdownMenuOpen)
  }

  const urlHasRoute = (routes) => {
    var contains = false;
    routes.map((route) => location.pathname.includes(route.path) ? contains = true : '')
    return contains
  }
  return (
    <li className="relative pb-3 px-6" key={route.name}>
      <button
        className="inline-flex items-center py-3 justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
        onClick={handleDropdownMenuClick}
        aria-haspopup="true"
      >
        <span className="inline-flex items-center">
          <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
          <span className="ml-4">{route.name}</span>
        </span>
        <DropdownIcon className="w-4 h-4" aria-hidden="true" />
      </button>
      <Transition
        show={urlHasRoute(route.routes) || isDropdownMenuOpen}
        enter="transition-all ease-in-out duration-300"
        enterFrom="opacity-25 max-h-0"
        enterTo="opacity-100 max-h-xl"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100 max-h-xl"
        leaveTo="opacity-0 max-h-0"
      >
        <ul
          className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
          aria-label="submenu"
        >
          {route.routes.map((r) => (
            <li
              className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              key={r.name}
            >
              <NavLink
                exact
                className={"w-full " + (location.pathname.includes(r.path) ? 'text-black dark:text-white font-bold' : '')}
                to={r.path}
              >
                {r.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </Transition>
    </li>
  )
}

export default SidebarSubmenu
