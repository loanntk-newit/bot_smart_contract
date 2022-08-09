import React from 'react'
import PropTypes from 'prop-types'

// types
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export default function Checkbox({ label, ...rest }: Props) {
  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          {...rest}
          type="checkbox"
          className="form-checkbox appearance-none ml-1 w-5 h-5 ease-linear transition-all duration-150 border border-slate-300 rounded checked:bg-slate-700 checked:border-slate-700 focus:border-slate-300"
        />
        {label ? <span className="ml-2 text-sm font-semibold text-slate-500">{label}</span> : null}
      </label>
    </>
  )
}

Checkbox.defaultProps = {}
// you can also pass additional props
// such as defaultValue, value, onChange, onClick etc.
Checkbox.propTypes = {
  label: PropTypes.string,
}
