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
  setValue: (e: any) => void
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
  required = false,
  setValue,
  handleAdd,
  handleRemove,
}) => {
  return (
    <div className="flex gap-2 items-end justify-between ">
      <BasicInput
        type={type}
        label={label}
        placeholder={placeholder}
        value={value}
        note={note}
        required={required}
        disabled={!!value}
        onChange={(e) => setValue(e.target.value)}
      />
      {!value && (
        <ButtonBorderIndigo style=" max-w-fit mb-3" text="✓" handleClick={() => handleAdd(value)} />
      )}
      {value && (
        <ButtonBorderRed style=" max-w-fit mb-3" text="✕" handleClick={() => handleRemove(id)} />
      )}
    </div>
  )
}

export default InputAccount
