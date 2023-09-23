interface BoxProps {
  id?: string
  className?: string
  children: React.ReactNode
}


const Box = ({ children, className = "", id }: BoxProps) => {

  return (
    <div id={id} className={`duration-200 gap-5 lg:gap-10 ${className}`}>
      {children}
    </div>
  )
}

export default Box