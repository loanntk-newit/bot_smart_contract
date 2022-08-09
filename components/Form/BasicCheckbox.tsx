interface Props {
  label?: string
  value?: string | number
  name?: string
  onChange?: (e: any) => void
}

const BasicCheckbox: React.FC<Props> = ({ label, value, name, onChange }) => {
  return (
    <div className="flex items-center form-check py-2">
      <input
        className="form-check-input h-4 w-4 border border-system-grey-500 rounded-[5px] checked:bg-primary-origin checked:border-primary-origin focus:outline-none transition duration-200 mr-2 cursor-pointer"
        type="checkbox"
        checked={!!value}
        value={value}
        name={name}
        onChange={onChange}
      />
      <label className="form-check-label inline-block" htmlFor={name}>
        {label}
      </label>
    </div>
  )
}

export default BasicCheckbox
