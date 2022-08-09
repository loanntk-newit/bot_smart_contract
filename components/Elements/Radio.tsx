import React from 'react'
import PropTypes from 'prop-types'

// types
type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string
}

export default function Radio({ label, ...rest }: Props) {
  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          {...rest}
          type="radio"
          className="form-radio appearance-none ml-1 w-5 h-5 ease-linear transition-all duration-150 border border-slate-400 rounded-full checked:bg-slate-800 checked:border-slate-800 focus:border-slate-400"
        />
        {label ? <span className="ml-2 text-sm font-semibold text-slate-700">{label}</span> : null}
      </label>
    </>
  )
}

Radio.defaultProps = {}
// you can also pass additional props
// such as defaultValue, value, onChange, onClick etc.
Radio.propTypes = {
  label: PropTypes.string,
}
