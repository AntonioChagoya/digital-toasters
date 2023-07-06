import Link from "next/link"

const Actions = () => {

  return (
    <section>
      <div className="container mx-auto flex justify-between py-5 uppercase">
        <Link href={"/"}>
          <h2>Digital Toaster</h2>
        </Link>


        <nav className="flex" >
          <ul className="flex gap-5">
            <Link href={"/"}>Wishlist</Link>
            <Link href={"/toasters"}>My cart</Link>
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default Actions