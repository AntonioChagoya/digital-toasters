// Next
import Link from "next/link"

// Libs
import { TbHeart } from 'react-icons/tb'

// Components
import Menu from "@components/views/header/Menu"
import Cart from "@components/views/cart"

const Actions = () => {

  return (
    <section className="px-4 sticky z-50">
      <div className="container mx-auto flex justify-between py-5 max-w-7xl">
        <Link className="flex items-center" href={"/"} aria-label="Go to digitaltoasters.com">
          <img width={120} src="/digital-toasters-logo.svg" alt="" />
        </Link>

        <Menu />

        <nav className="flex" >
          <div className="flex gap-5 items-center">
            <Link href={"/"} className="flex gap-2 items-center">
              <TbHeart size={25} />
            </Link>

            <Cart />
          </div>
        </nav>
      </div>
    </section>
  )
}

export default Actions