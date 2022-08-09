import { InputTime } from '.'
import { ButtonRed } from '../Button'
import BasicInput from './BasicInput'
interface Props {
  id: string | number
  date?: string
  start_time?: string
  end_time?: string
  onChangeStartTime?: (e: any) => void
  onChangeEndTime: (e: any) => void
  handleRemove(e: any): void
}

const InputTimeSchedule: React.FC<Props> = ({
  id,
  date,
  start_time,
  end_time,
  onChangeStartTime,
  onChangeEndTime,
  handleRemove,
}) => {
  return (
    <div className="flex gap-2 items-center justify-between">
      <BasicInput value="時間" name="時間" disabled />
      <BasicInput value={date ?? ''} name="date_time" disabled />
      <InputTime
        name="start_time"
        placeholder="00:00"
        value={start_time}
        minuteStep={5}
        onChange={onChangeStartTime}
      />
      <div className="mb-3 text-center">~</div>
      <InputTime
        name="end_time"
        placeholder="00:00"
        value={end_time}
        minuteStep={5}
        onChange={onChangeEndTime}
      />
      <ButtonRed style=" max-w-fit mb-3" text="✕" handleClick={() => handleRemove(id)} />
    </div>
  )
}

export default InputTimeSchedule
