interface Props {
  text?: string
  style?: string
  value?: string | number
  name?: string
  placeholder?: string
  error?: string
  onChange?: (e: any) => void
}

const BasicInput: React.FC<Props> = ({
  text,
  style,
  value,
  name,
  placeholder,
  error,
  onChange,
}) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-6 mb-3">
      {text && (
        <div className="flex items-center mb-2 sm:mb-0 sm:col-span-1">
          <label className={style}>{text}</label>
        </div>
      )}

      <div className={text ? 'sm:col-span-2' : 'sm:col-span-3'}>
        <input
          type="password"
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          className="px-2 sm:px-4 py-2 placeholder-system-grey-500 text-black border border-system-grey-500 rounded outline-none focus:outline-none focus:border-primary-dark w-full"
        />
        {error && <span className="text-red-500">{error}</span>}
      </div>
    </div>
  )
}

export default BasicInput
