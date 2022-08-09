import React from 'react'
import PropTypes from 'prop-types'

// types
type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  border: 'border' | 'borderless'
  size: 'sm' | 'lg' | 'regular'
  leftIcon?: string
  rightIcon?: string
  type: string
}

const Input = ({ border, size, leftIcon, rightIcon, type, ...rest }: Props) => {
  const sizes: any = {
    sm: 'px-2 py-2 text-sm ',
    lg: 'px-3 py-3 text-sm ',
    regular: 'px-3 py-2 text-sm ',
  }
  const borders = {
    border: 'border-slate-300',
    borderless: 'border-transparent shadow',
  }
  let inputClasses =
    sizes[size] +
    ' w-full placeholder-slate-200 text-slate-700 relative bg-white rounded-md outline-none focus:ring focus:ring-sky-500 focus:ring-1 focus:border-sky-500 border border-solid transition duration-200 '
  inputClasses = borders[border] + ' ' + inputClasses
  let leftAddon = null
  let rightAddon = null
  let wrapperClasses = 'mb-3 pt-0'
  if (leftIcon) {
    inputClasses = inputClasses + 'pl-10 '
    wrapperClasses = 'relative flex w-full flex-wrap items-stretch mb-3'
    leftAddon = (
      <span className="z-10 h-full flex absolute text-center text-slate-300 text-sm items-center w-8 pl-3">
        <i className={leftIcon}></i>
      </span>
    )
  }
  if (rightIcon) {
    inputClasses = inputClasses + 'pr-10 '
    wrapperClasses = 'relative flex w-full flex-wrap items-stretch mb-3'
    rightAddon = (
      <span className="z-10 h-full flex absolute text-center text-slate-300 text-sm items-center w-8 right-0">
        <i className={rightIcon}></i>
      </span>
    )
  }
  return (
    <>
      <div className={wrapperClasses}>
        {leftAddon}
        {type && type === 'textarea' ? (
          <>
            {/* 
             // @ts-ignore */}
            <textarea {...rest} className={inputClasses} />
          </>
        ) : (
          <input {...rest} type={type} className={inputClasses} />
        )}
        {rightAddon}
      </div>
    </>
  )
}

Input.defaultProps = {
  border: 'border',
  size: 'regular',
  type: 'text',
}

Input.propTypes = {
  border: PropTypes.oneOf(['border', 'borderless']),
  size: PropTypes.oneOf(['sm', 'lg', 'regular']),
  // NOTE: you sould only pass icon classes
  // // // if you also pass tailwindcss classes
  // // // the output may not be a desired one
  leftIcon: PropTypes.string,
  // NOTE: you sould only pass icon classes
  // // // if you also pass tailwindcss classes
  // // // the output may not be a desired one
  rightIcon: PropTypes.string,
}

export default Input
