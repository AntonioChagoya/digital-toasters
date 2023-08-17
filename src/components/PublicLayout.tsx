// Components
import HeaderIndex from "./header"
import Footer from "./footer"
import Carousel from "./home/Carousel"
const PublicLayout = ({ children }) => {

  return (
    <>
      <HeaderIndex />
      <main className="flex flex-col gap-20 relative z-0">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default PublicLayout