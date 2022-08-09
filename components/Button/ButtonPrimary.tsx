interface Props {
  text?: string
  style?: string
  disabled?: boolean
  handleClick?: (e: any) => void
}

const ButtonPrimary: React.FC<Props> = ({ text, style, disabled = false, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className={
        'w-full lg:w-80 bg-primary-origin text-white disabled:bg-opacity-50 hover:bg-primary-dark active:bg-primary-dark px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150' +
        style
      }
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default ButtonPrimary
