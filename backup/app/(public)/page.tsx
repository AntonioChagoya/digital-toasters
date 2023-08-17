import HeaderIndex from "../../../src/components/header"
import Carousel from "../../../src/components/home/Carousel"

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
