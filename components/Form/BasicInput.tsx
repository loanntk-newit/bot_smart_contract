interface Props {
  name?: string
  label?: string
  style?: string
  value?: string | number
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  type?: string
  note?: string
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
  required = false,
  error,
  note,
  onChange,
}) => {
  return (
    <div className="w-full mb-3">
      {label && (
        <div className="flex items-center gap-3 mb-2">
          <label className={style}>{label}</label>
          {required && <div className="bg-red text-white rounded-2xl px-[5px]">Required</div>}
        </div>
      )}

      <div>
        <input
          type={type ?? 'text'}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          className="px-2 sm:px-4 py-2 placeholder-secondary text-black border border-border rounded-lg outline-none focus:outline-none focus:border-indigo w-full"
          disabled={disabled}
          required={required}
        />
        {note && <div className="text-secondary">{note}</div>}
        {error && <div className="text-red">{error}</div>}
      </div>
    </div>
  )
}

export default BasicInput
