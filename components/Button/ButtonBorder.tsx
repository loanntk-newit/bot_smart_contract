interface Props {
  icon?: string
  text?: string
  style?: string
  handleClick?: (e: any) => void
}

const ButtonBorder: React.FC<Props> = ({ icon, text, style, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className={
        'flex items-center gap-2 justify-center w-full lg:w-60 bg-white hover:bg-border active:bg-border px-4 py-2 rounded-lg border border-border shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150' +
        style
      }
    >
      {icon && <img src={`/imgs/${icon}.svg`} alt="" />}
      {text && <span className="text-secondary">{text}</span>}
    </button>
  )
}

export default ButtonBorder
