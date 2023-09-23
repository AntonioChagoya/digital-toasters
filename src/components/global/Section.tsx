


interface SectionProps {
  children: React.ReactNode
  className?: string
  title?: string
  subTitle?: string
}

const Section = ({ className = "", children, title, subTitle }: SectionProps) => {

  return (
    <section className={`${className} flex flex-col gap-5 lg:gap-10 p-5`}>
      {
        title &&
        <div>
          <p className="text-center text-accent mb-0">{subTitle}</p>
          <h3 className="text-center">{title}</h3>
        </div>
      }
      {children}
    </section>
  )
}

export default Section