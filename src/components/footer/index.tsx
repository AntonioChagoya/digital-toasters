import Link from "next/link"

const Footer = () => {

  return (
    <footer className="bg-secondary p-5">
      <section className="flex flex-col justify-center items-center container mx-auto max-w-xl gap-5">
        <div className="flex gap-10 gap-y-2 justify-evenly w-full flex-wrap">
          <Link href={"/terminos-y-condiciones"} className="text-white">
            Productos
          </Link>
          <Link href={"/terminos-y-condiciones"} className="text-white">
            Casas tostadoras
          </Link>
          <Link href={"/terminos-y-condiciones"} className="text-white">
            Productores
          </Link>
          <Link href={"/terminos-y-condiciones"} className="text-white">
            Cafeterías
          </Link>
          <Link href={"/aviso-de-privacidad"} className="text-white">
            Aviso de privacidad
          </Link>
          <Link href={"/terminos-y-condiciones"} className="text-white">
            Términos y condiciones
          </Link>
        </div>

        <div className="">
          <img src="/digital-toasters-logo.svg" alt="" />

          <div>
            <p className="text-white text-sm">© 2023 Digital Toasters</p>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer