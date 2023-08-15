// Components
import HeaderIndex from "./header"
import Footer from "./footer"
import Carousel from "./Carousel"
const PublicLayout = ({ children }) => {

  return (
    <>
      <HeaderIndex />
      <div className="flex flex-col gap-20 relative z-0">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default PublicLayout