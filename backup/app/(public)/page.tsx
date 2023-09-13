import HeaderIndex from "../../../src/components/Header"
import Carousel from "../../../src/components/Home/Carousel"

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
