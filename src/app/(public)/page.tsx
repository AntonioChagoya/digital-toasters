import HeaderIndex from "./components/header"
import Carousel from "./components/carousel"

export default function Home() {
  return (
    <>
      <HeaderIndex />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Carousel />
      </main>
    </>
  )
}
