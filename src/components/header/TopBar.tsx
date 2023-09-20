import Link from "next/link"

const TopBar = () => {

  return (
    <section className="bg-primary text-white ">
      <div className="container mx-auto flex justify-between py-1 max-w-7xl">
        <div>
          <p>

          </p>
        </div>

        <nav className="flex" >
          <ul className="divide-x">
            <Link href="/" className="px-2">
              Sign In
            </Link>
            <Link href="/toasters" className="px-2">
              Register
            </Link>
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default TopBar