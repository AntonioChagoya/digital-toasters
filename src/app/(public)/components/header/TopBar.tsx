import Link from "next/link"

const TopBar = () => {

  return (
    <section>
      <div className="container mx-auto flex justify-between py-3">
        <div>
          USD | Order Online Call Us (0123) 456789
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