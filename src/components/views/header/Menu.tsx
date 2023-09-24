import Link from "next/link"
import { TbPaperBag, TbCategory2, TbFlame, TbBuildingStore } from "react-icons/tb";

const Menu = () => {

  return (
    // <section className="bg-gray-900 text-white">
    //   <div className="container mx-auto flex justify-center py-5">
    <nav className="hidden lg:flex" >
      <ul className="flex gap-8">
        <Link href={"/products"}>
          <div className="flex flex-col items-center hover:text-primary duration-200">
            <TbPaperBag size={25} />

            Productos
          </div>
        </Link>
        {/* <Link href={"/colecciones"}>
          <div className="flex flex-col items-center">
            <TbCategory2 size={30} />

            <p className="text-center leading-tight">
              Colecciones
            </p>
          </div>
        </Link> */}
        <Link href={"/casas-tostadoras"}>
          <div className="flex flex-col items-center hover:text-primary duration-200">
            <TbFlame size={25} />

            Tostadores
          </div>
        </Link>
        <Link href={"/cafeterias"}>
          <div className="flex flex-col items-center hover:text-primary duration-200">
            <TbBuildingStore size={25} />

            Cafeterías
          </div>
        </Link>
      </ul>
    </nav>
    // </div>
    // </section>
  )
}

export default Menu