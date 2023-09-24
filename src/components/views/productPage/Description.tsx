import { TbDots } from "react-icons/tb"

const ProductPageDescription = ({ description }: { description: string }) => {

  return (
    <div className="group relative max-h-[120px] overflow-hidden transition duration-400 my-2 pb-1">
      <p className=" text-gray-500">{description}</p>
      <div
        onClick={() => {
          document.getElementById("Description")?.scrollIntoView({ behavior: "smooth" })
        }}
        className="absolute top-0 left-0 flex flex-col justify-end items-center w-full h-full bg-gradient-to-t from-white via-transparent rounded cursor-pointer"
      >
        <TbDots className="animate-bounce hidden group-hover:block" size={35} />
      </div>
    </div>
  )
}

export default ProductPageDescription