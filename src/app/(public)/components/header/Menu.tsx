import Link from "next/link"

const Menu = () => {

  return (
    <section className="bg-gray-800 text-white uppercase">
      <div className="container mx-auto flex justify-center py-5">
        <nav className="flex" >
          <ul className="flex gap-5">
            <Link href={"/"}>Home</Link>
            <Link href={"/toasters"}>Casas tostadoras</Link>
            <Link href={"/toasters"}>Cafeterías</Link>
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default Menu