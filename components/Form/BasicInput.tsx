interface Props {
  name?: string
  label?: string
  style?: string
  value?: string | number
  placeholder?: string
  disabled?: boolean
  error?: string
  type?: string
  onChange?: (e: any) => void
}

const BasicInput: React.FC<Props> = ({
  name,
  label,
  style,
  value,
  placeholder,
  type,
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
        <input
          type={type ?? 'text'}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          className="px-2 sm:px-4 py-2 placeholder-system-grey-500 text-black border border-system-grey-500 rounded outline-none focus:outline-none focus:border-primary-dark w-full"
          disabled={disabled}
        />
        {error && <span className="text-red-500">{error}</span>}
      </div>
    </div>
  )
}

export default BasicInput
