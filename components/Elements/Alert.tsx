import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'

// types
type Props = {
  children?: ReactNode
  color:
    | 'light'
    | 'dark'
    | 'slate'
    | 'red'
    | 'orange'
    | 'amber'
    | 'emerald'
    | 'teal'
    | 'sky'
    | 'indigo'
    | 'purple'
    | 'pink'
}

export default function Alert({ color, children }: Props) {
  const alertColors: any = {
    light: 'text-slate-800 bg-slate-200',
    dark: 'text-slate-200 bg-slate-800',
    slate: 'text-white bg-slate-500',
    red: 'text-white bg-red-500',
    orange: 'text-white bg-orange-500',
    amber: 'text-white bg-amber-500',
    emerald: 'text-white bg-emerald-500',
    teal: 'text-white bg-teal-500',
    sky: 'text-white bg-sky-500',
    indigo: 'text-white bg-indigo-500',
    purple: 'text-white bg-purple-500',
    pink: 'text-white bg-pink-500',
  }
  return (
    <>
      <div className={'px-6 py-4 border-0 rounded relative mb-4 ' + alertColors[color]}>
        {children}
      </div>
    </>
  )
}
Alert.defaultProps = {
  color: 'slate',
}
Alert.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    'light',
    'dark',
    'slate',
    'red',
    'orange',
    'amber',
    'emerald',
    'teal',
    'sky',
    'indigo',
    'purple',
    'pink',
  ]),
}
