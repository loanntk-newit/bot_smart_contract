interface Props {
  icon?: string
  text?: string
  style?: string
  disabled?: boolean
  handleClick?: (e: any) => void
}

const ButtonBorderIndigo: React.FC<Props> = ({ icon, text, style, disabled, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={
        'flex items-center gap-2 justify-center w-full lg:w-60 bg-white text-indigo hover:bg-indigo active:bg-indigo hover:text-white active:text-white px-4 py-2 rounded-lg border border-indigo disabled:opacity-30 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-indigo shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150' +
        style
      }
    >
      {icon && <img src={`/imgs/${icon}.svg`} alt="" />}
      {text}
    </button>
  )
}

export default ButtonBorderIndigo
