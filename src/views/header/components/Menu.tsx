import Link from "next/link"
import { TbPaperBag, TbCategory2, TbFlame, TbBuildingStore } from "react-icons/tb";

const Menu = () => {

  return (
    <nav className="hidden lg:flex gap-5 py-4" >
      <Link href={"/products"}>
        <div className="flex flex-col items-center hover:text-primary duration-200 font-bold">
          Productos
        </div>
      </Link>
      <Link href={"/casas-tostadoras"}>
        <div className="flex flex-col items-center hover:text-primary duration-200 font-bold">
          Tostadores
        </div>
      </Link>
      <Link href={"/cafeterias"}>
        <div className="flex flex-col items-center hover:text-primary duration-200 font-bold">
          Cafeterías
        </div>
      </Link>
    </nav>
  )
}

export default Menu