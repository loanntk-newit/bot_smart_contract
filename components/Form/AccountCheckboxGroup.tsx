import { useEffect, useState } from 'react'
import MetaMaskLabelCheckbox from '../Connecter/MetaMaskLabelCheckbox'

interface Props {
  name: string
  label: string
  options: any
  data?: any
  onChange: (e: any) => void
}

const AccountCheckboxGroup: React.FC<Props> = ({ name, data, label, options, onChange }) => {
  const [value, setValue] = useState<any>(data)

  const isChecked = (val: string | number) => {
    if (value) {
      const index = value.indexOf(val)
      return index === -1 ? false : true
    }
    if (data) {
      let index = data.indexOf(val)
      return index === -1 ? false : true
    }
    return false
  }

  const handleOnChange = (val: string | number) => {
    if (value) {
      let index = value.indexOf(val)
      index === -1
        ? setValue([...value, val])
        : setValue((current: Array<string | number>) =>
            current.filter((elm: string | number) => {
              return elm !== val
            })
          )
    } else {
      setValue([val])
    }
  }

  useEffect(() => {
    data && setValue(data)
  }, [data])

  useEffect(() => {
    value && onChange(value)
  }, [value])

  return (
    <>
      {options &&
        options.length > 0 &&
        options.map(function (elm: any, i: number) {
          return (
            <div className="flex items-center form-check py-2" key={`${name}-${i}`}>
              <input
                className="form-check-input h-4 w-4 border border-system-grey-500 rounded-[5px] checked:bg-primary-origin checked:border-primary-origin focus:outline-none transition duration-200 mr-2 cursor-pointer"
                type="checkbox"
                value={elm.id}
                id={`${name}-${i}`}
                name={elm[label]}
                checked={isChecked(elm.id)}
                onChange={() => handleOnChange(elm.id)}
              />
              <label className="form-check-label inline-block" htmlFor={`${name}-${i}`}>
                <MetaMaskLabelCheckbox primaryKey={Object.values(elm).toString()} />
              </label>
            </div>
          )
        })}
    </>
  )
}

export default AccountCheckboxGroup
