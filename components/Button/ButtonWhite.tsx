interface Props {
  text?: string
  style?: string
  handleClick?: (e: any) => void
}

const ButtonWhite: React.FC<Props> = ({ text, style, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className={
        'w-full lg:w-80 bg-white hover:bg-system-grey-500 active:bg-system-grey-500 px-4 py-2 rounded border border-system-grey-500 shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150' +
        style
      }
    >
      {text}
    </button>
  )
}

export default ButtonWhite
