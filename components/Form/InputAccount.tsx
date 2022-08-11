import { ButtonBorderIndigo, ButtonBorderRed } from '../Button'
import BasicInput from './BasicInput'
interface Props {
  id: number
  type?: string
  label?: string
  placeholder?: string
  value: string
  note?: string
  required?: boolean
  disabled?: boolean
  handleChange: (e: any) => void
  handleAdd: (e: string) => void
  handleRemove(e: number): void
}

const InputAccount: React.FC<Props> = ({
  id,
  type,
  label,
  placeholder,
  value,
  note,
  disabled = false,
  required = false,
  handleChange,
  handleAdd,
  handleRemove,
}) => {
  return (
    <div className="flex gap-2 items-end justify-between ">
      <BasicInput
        type={type}
        label={label}
        placeholder={placeholder}
        value={value ?? ''}
        note={note}
        required={required}
        disabled={disabled}
        onChange={handleChange}
      />
      {!disabled && (
        <ButtonBorderIndigo style=" max-w-fit mb-3" text="✓" handleClick={() => handleAdd(value)} />
      )}
      {disabled && (
        <ButtonBorderRed style=" max-w-fit mb-3" text="✕" handleClick={() => handleRemove(id)} />
      )}
    </div>
  )
}

export default InputAccount
