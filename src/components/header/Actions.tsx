// Next
import Link from "next/link"

// Libs
import { TbHeart } from 'react-icons/tb'

// Components
import Menu from "@components/header/Menu"
import Cart from "@components/cart"

const Actions = () => {

  return (
    <section>
      <div className="container mx-auto flex justify-between py-8">
        <Link className="flex items-center" href={"/"}>
          <img width={150} src="/digital-toasters-logo.svg" alt="" />
        </Link>

        <Menu />

        <nav className="flex" >
          <div className="flex gap-5 items-center">
            <Link href={"/"} className="flex gap-2 items-center">
              <TbHeart size={30} />
            </Link>

            <Cart />
          </div>
        </nav>
      </div>
    </section>
  )
}

export default Actions