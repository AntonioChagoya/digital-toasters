import Link from "next/link"
import { AcademicCapIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

const Actions = () => {

  return (
    <section>
      <div className="container mx-auto flex justify-between py-10 uppercase">
        <Link className="flex items-center" href={"/"}>
          <h2>Digital Toaster</h2>
        </Link>


        <nav className="flex" >
          <div className="flex gap-5 items-center">
            <Link href={"/"} className="flex gap-2 items-center">
              <HeartIcon className="w-8" />
            </Link>
            <Link href={"/toasters"} className="flex gap-2 items-center">
              <ShoppingBagIcon className="w-8" />
            </Link>
          </div>
        </nav>
      </div>
    </section>
  )
}

export default Actions