interface BoxProps {
  id?: string
  className?: string
  children: React.ReactNode
}


const Box = ({ id, children, className = "" }: BoxProps) => {

  return (
    <div id={id} className={`duration-200 ${className}`}>
      {children}
    </div>
  )
}

export default Box