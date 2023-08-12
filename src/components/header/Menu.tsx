import Link from "next/link"
import { TbPaperBag, TbCategory2, TbFlame, TbBuildingStore } from "react-icons/tb";

const Menu = () => {

  return (
    // <section className="bg-gray-900 text-white">
    //   <div className="container mx-auto flex justify-center py-5">
    <nav className="flex" >
      <ul className="flex gap-8">
        <Link href={"/toasters"}>
          <div className="flex flex-col items-center">
            <TbPaperBag size={30} />

            <p className="text-center leading-tight">
              Productos
            </p>
          </div>
        </Link>
        <Link href={"/toasters"}>
          <div className="flex flex-col items-center">
            <TbCategory2 size={30} />

            <p className="text-center leading-tight">
              Categorías
            </p>
          </div>
        </Link>
        <Link href={"/toasters"}>
          <div className="flex flex-col items-center">
            <TbFlame size={30} />

            <p className="text-center leading-tight">
              Tostadores
            </p>
          </div>
        </Link>
        <Link href={"/toasters"}>
          <div className="flex flex-col items-center">
            <TbBuildingStore size={30} />

            <p className="text-center leading-tight">
              Cafeterías
            </p>
          </div>
        </Link>
      </ul>
    </nav>
    // </div>
    // </section>
  )
}

export default Menu