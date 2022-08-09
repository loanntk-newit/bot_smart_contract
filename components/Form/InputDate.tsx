import { SyntheticEvent } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  name?: string
  label?: string
  style?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  onChange(e: any): void
}

const InputDate: React.FC<Props> = ({
  name,
  label,
  style,
  value,
  disabled = false,
  error,
  onChange,
}) => {
  return (
    <div className="w-full sm:grid sm:grid-cols-3 items-center sm:gap-6 mb-3">
      {label && (
        <div className="flex items-center mb-2 sm:mb-0 sm:col-span-1">
          <label className={style}>{label}</label>
        </div>
      )}

      <div className={label ? 'sm:col-span-2' : 'sm:col-span-3'}>
        <DatePicker
          name={name}
          selected={value ? new Date(value) : new Date()}
          onChange={onChange}
          disabled={disabled}
          dateFormat="yyyy-MM-dd"
          className="px-2 sm:px-4 py-2 placeholder-system-grey-500 text-black border border-system-grey-500 rounded outline-none focus:outline-none focus:border-primary-dark w-full"
        />

        {error && <span className="text-red-500">{error}</span>}
      </div>
    </div>
  )
}

export default InputDate
