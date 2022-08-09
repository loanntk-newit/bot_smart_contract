interface Props {
  label?: string
  style?: string
  name?: string
  value?: string
  placeholder?: string
  row?: number
  error?: string
  onChange?: (e: any) => void
}

const BasicArea: React.FC<Props> = ({
  label,
  style,
  name,
  value,
  placeholder,
  row,
  error,
  onChange,
}) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-6 mb-3">
      {label && (
        <div className="flex items-center mb-2 sm:mb-0 sm:col-span-1">
          <label className={style}>{label}</label>
        </div>
      )}

      <div className={label ? 'sm:col-span-2' : 'sm:col-span-3'}>
        <textarea
          className="px-2 sm:px-4 py-2 text-black border border-system-grey-500 rounded outline-none focus:outline-none focus:border-primary-dark w-full"
          placeholder={placeholder}
          rows={row}
          name={name}
          defaultValue={value}
          onChange={onChange}
        />
      </div>

      {error && <span className="text-red-500">{error}</span>}
    </div>
  )
}

export default BasicArea
