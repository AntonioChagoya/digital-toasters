// Components
import HeaderIndex from "components/Header"
import Footer from "components/Footer"

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