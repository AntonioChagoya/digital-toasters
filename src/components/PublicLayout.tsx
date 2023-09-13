// Components
import HeaderIndex from "./Header"
import Footer from "./Footer"

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