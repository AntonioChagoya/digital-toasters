// Next
import Link from "next/link"

// Libs
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

// Components
import Menu from "@components/header/Menu"
import Cart from "@components/cart"

const Actions = () => {

  return (
    <section>
      <div className="container mx-auto flex justify-between py-8">
        <Link className="flex items-center" href={"/"}>
          <h5>Digital Toaster</h5>
        </Link>

        <Menu />

        <nav className="flex" >
          <div className="flex gap-5 items-center">
            <Link href={"/"} className="flex gap-2 items-center">
              <HeartIcon className="w-8" />
            </Link>

            <Cart />
          </div>
        </nav>
      </div>
    </section>
  )
}

export default Actions