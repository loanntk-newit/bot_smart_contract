interface Props {
  text?: string
  style?: string
  value?: string | number
  name?: string
  note?: string
  span?: string
  placeholder?: string
  error?: string
  isTextArea?: boolean
  row?: number
  onChange?: (e: any) => void
}

const InputHasNote: React.FC<Props> = ({
  text,
  style,
  value,
  name,
  placeholder,
  note,
  span,
  error,
  isTextArea = false,
  row = 4,
  onChange,
}) => {
  return (
    <div className="mb-3">
      <div className="flex flex-wrap justify-between mb-2">
        <span className={style}>{text}</span>
        <span>{span}</span>
      </div>

      <div className="w-full mb-2">
        {isTextArea && (
          <textarea
            className="p-2 sm:px-4 text-black border border-system-grey-500 rounded outline-none focus:outline-none focus:border-primary-dark w-full"
            placeholder={placeholder}
            rows={row}
            name={name}
            defaultValue={value}
            onChange={onChange}
          />
        )}
        {!isTextArea && (
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            name={name}
            className="p-2 sm:px-4 placeholder-system-grey-500 text-black border border-system-grey-500 rounded outline-none focus:outline-none focus:border-primary-dark w-full"
            onChange={onChange}
          />
        )}
        {error && <span className="text-red-500">{error}</span>}
      </div>
      <div className="w-full">{note}</div>
    </div>
  )
}

export default InputHasNote
