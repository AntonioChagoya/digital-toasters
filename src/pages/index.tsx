// Component
import Carousel from "@components/Carousel"
import HeaderIndex from "@components/header"
import SmallProductCard from "@components/product-cards/Small";
import RecentProducts from "@components/RecentProducts";

// GraphQL
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from "graphql/queries/getAllProducts";

// Shopify 
import type { Product } from '@shopify/hydrogen-react/storefront-api-types';

export default function Home() {
  const { loading, error, data } = useQuery<StorefrontResponse<Product>>(GET_PRODUCTS, {
    variables: {
      qty: 10,
      variantsQty: 1,
    },
  });

  return (
    <>
      <HeaderIndex />
      <main className="flex flex-col gap-16 items-center justify-between container mx-auto">
        <Carousel />

        <section className="flex flex-col items-center justify-center gap-5 p-5 lg:p-0">
          <div>
            <h4 className="text-center">Recent Products</h4>
            <p className="text-center">Choose your coffee</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* {data?.products?.edges.map((product) => (
              <SmallProductCard key={product.cursor} product={product.node} />
            ))} */}
            {
              data &&
              <RecentProducts data={data} />
            }
          </div>

        </section>
      </main>
    </>
  )
}
