interface BoxProps {
  id?: string
  className?: string
  children: React.ReactNode
}


const Box = ({ id, children, className = "" }: BoxProps) => {

  return (
    <div id={id} className={`${className}`}>
      {children}
    </div>
  )
}

export default Box