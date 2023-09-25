// Components
import HeaderIndex from "views/header"
import Footer from "views/footer"

const PublicLayout = ({ children }) => {

  return (
    <>
      <HeaderIndex />
      <main className="flex flex-col gap-20 relative z-0 py-10 mx-auto container max-w-7xl">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default PublicLayout