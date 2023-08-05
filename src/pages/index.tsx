import Carousel from "../components/Carousel"
import HeaderIndex from "../components/header"

// Libs

// GraphQL
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from "graphql/queries/getAllProducts";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS, {
    variables: {
      qty: 3,
      variantsQty: 1,
    },
  });

  return (
    <>
      <HeaderIndex />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Carousel />

        <section>
          <div>
            <h4 className="text-center">Recent Products</h4>
            <p className="text-center">Choose your coffee</p>
          </div>


        </section>
      </main>
    </>
  )
}
