import { ButtonBorderRed } from '../Button'
import BasicInput from './BasicInput'
interface Props {
  id: string | number
  type?: string
  label?: string
  placeholder?: string
  value?: string
  note?: string
  required?: boolean
  onChange?: (e: any) => void
  handleRemove(e: any): void
}

const InputAccount: React.FC<Props> = ({
  id,
  type,
  label,
  placeholder,
  value,
  note,
  required = false,
  onChange,
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
        onChange={onChange}
      />
      <ButtonBorderRed style=" max-w-fit mb-3" text="✕" handleClick={() => handleRemove(id)} />
    </div>
  )
}

export default InputAccount
