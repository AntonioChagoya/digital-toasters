// Libs
import { TbLoader3 } from "react-icons/tb";

// Theme
import { ButtonSize, ButtonColor, ButtonTextTransform, ButtonWide } from "theme";

interface ButtonProps {
  children?: React.ReactNode,
  color?: string,
  size?: string,
  transform?: string,
  wide?: string,
  loading?: boolean,
}

const Button = ({
  children = <></>,
  color = "primary",
  size = "sm",
  transform = "uppercase",
  wide = "auto",
  loading = false
}: ButtonProps) => {
  const defaults = "rounded font-bold text-white duration-200 hover:opacity-80"
  const classNames = defaults + " " + ButtonSize[size] + " " + ButtonColor[color] + " " + ButtonTextTransform[transform] + " " + ButtonWide[wide]

  return (
    <button
      disabled={loading}
      className={classNames}
    >
      {
        loading
          ? <TbLoader3 className="animate-spin" size={24} />
          : <>{children}</>
      }
    </button>
  )
}

export default Button