import Link from "next/link"

const Menu = () => {

  return (
    <section>
      <div className="container mx-auto flex justify-between py-5">
        <Link href={"/"}>
          <h2>Digital Toaster</h2>
        </Link>


        <nav className="flex" >
          <ul className="flex gap-5">
            <Link href={"/"}>Home</Link>
            <Link href={"/toasters"}>Products</Link>
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default Menu