interface Props {
  name?: string
  value?: string | number
  label?: string
  style?: string
  option?: object
  error?: string
  onChange?: (e: any) => void
}

const BasicSelect: React.FC<Props> = ({ name, label, value, style, option, error, onChange }) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-6 mb-3">
      {label && (
        <div className="flex items-center mb-2 sm:mb-0 sm:col-span-1">
          <label className={style}>{label}</label>
        </div>
      )}

      <select
        name={name}
        className={
          (label ? 'sm:col-span-2' : 'sm:col-span-3 w-full') +
          ' px-2 sm:px-4 py-2 placeholder-system-grey-500 text-black border border-system-grey-500 rounded outline-none focus:outline-none focus:border-primary-dark' +
          style
        }
        value={value}
        onChange={onChange}
      >
        {option &&
          Object.values(option).map(function (elm, i) {
            return (
              <option key={i} value={elm.value}>
                {elm.label}
              </option>
            )
          })}
      </select>

      {error && <span className="text-red-500 sm:col-span-3 w-full">{error}</span>}
    </div>
  )
}

export default BasicSelect
