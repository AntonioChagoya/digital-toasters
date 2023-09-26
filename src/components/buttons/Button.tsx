// Libs
import { TbLoader3 } from "react-icons/tb";

// Theme
import { ButtonSize, ButtonColor, ButtonTextTransform, ButtonWide } from "theme";

interface ButtonProps {
  children: React.ReactNode,
  color?: ButtonColor,
  size?: ButtonSize,
  transform?: ButtonTextTransform,
  wide?: ButtonWide,
  loading?: boolean,
}

const Button = ({
  children = <></>,
  color = ButtonColor.primary,
  size = ButtonSize.md,
  transform = ButtonTextTransform.uppercase,
  wide = ButtonWide.auto,
  loading = false
}: ButtonProps) => {
  const defaults = "rounded font-bold text-white duration-200 hover:opacity-80"
  const classNames = defaults + " " + size + " " + color + " " + transform + " " + wide

  return (
    <button
      disabled={loading}
      className={classNames}
    >
      {
        loading
          ? <TbLoader3 className={`animate-spin ${color} text-white mx-auto`} size={28} />
          : <>{children}</>
      }
    </button>
  )
}

export default Button