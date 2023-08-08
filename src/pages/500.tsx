import { LayoutType } from "types/app"

const page404 = () => {

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center h-[90vh] gap-10">
      <div className="text-center">
        <h1 className="text-7xl  text-center font-bold text-gray-100 mb-2">404</h1>
        <p className="text-2xl font-medium mb-4">Page not found</p>
      </div>
      <a href="/" className="block w-auto px-[31px] py-[13px] transition duration-150 ease-in-out delay-150 border rounded-[50px] border-PrimmaryColor h-fit hover:cursor-pointer hover:scale-110 text-PrimmaryColor">Go to home page</a>
    </div>
  )
}

page404.layout = LayoutType.PUBLIC
export default page404