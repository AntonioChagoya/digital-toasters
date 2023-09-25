

// GraphQL
import { useQuery } from "@apollo/client"
import { GET_RELATED_PRODUCTS } from "graphql/queries/products"

// Components
import ProductsCarousel from "../../../components/carousells/ProductsCarousel"

// Libs
import { TbLoader3 } from "react-icons/tb";


const RelatedProducts = () => {
  const { data, loading } = useQuery(GET_RELATED_PRODUCTS)

  return (
    <div className="p-5">
      <h4>Productos relacionados</h4>
      {
        loading &&
        <div className="w-full h-[200px] flex justify-center items-center">
          <TbLoader3 size={40} className="text-primary animate-spin" />
        </div>
      }
      {
        data?.productRecommendations && !loading &&
        <ProductsCarousel data={data?.productRecommendations} />
      }
    </div>
  )
}

export default RelatedProducts