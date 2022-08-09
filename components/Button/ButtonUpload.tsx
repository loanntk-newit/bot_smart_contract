interface Props {
  style?: string
  text?: string
  file?: any
  accept?: string
  handleChangeFile?: (e: any) => void
}

const ButtonUpload: React.FC<Props> = ({ style, text, file, accept, handleChangeFile }) => {
  return (
    <div className="flex flex-wrap gap-1">
      <label
        className={
          'w-full text-center cursor-pointer bg-white hover:bg-system-grey-500 active:bg-system-grey-500 px-4 py-2 rounded border border-system-grey-500 shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150' +
          style
        }
      >
        <input
          type="file"
          name="file"
          multiple
          ref={(input) => {
            file = input
          }}
          onChange={handleChangeFile}
          accept={accept}
          hidden
        />
        {text}
      </label>
    </div>
  )
}

export default ButtonUpload
