import { useState } from "react";

// Next
import { useRouter } from "next/router"

// Apollo
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCTS } from "graphql/queries/getAllProducts";

// Components
import SmallProductCard from "@components/productCards/Small"

// Libs
import { TbLoader3 } from 'react-icons/tb'

// Types
import { LayoutType } from "types/app"
import { useEffect } from "react";


export async function getServerSideProps(params) {

  return {
    props: {
      query: params?.query || null,
    }
  }
}

const Productos = ({ query }) => {
  const router = useRouter()

  const defaultQuery = {
    first: 12,
    variantsQty: 1,
    sortKey: "TITLE",
    reverse: false,
  }
  const [getProducts, { data, loading }] = useLazyQuery(GET_PRODUCTS);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      getProducts({ variables: defaultQuery });
    } else {
      getProducts({
        variables: {
          first: 12,
          variantsQty: 10,
          sortKey: router.query.sortKey || "TITLE",
          query: router.query.query || "",
          reverse: router.query.reverse === "true" ? true : false,
        }
      });
    }
  }, [router.query]);

  console.log(data);


  return (
    <>
      <div className="container mx-auto flex gap-10 p-10 lg:py-16 lg:px-0">
        <aside className="relative hidden lg:flex flex-col min-w-[20%]">
          <div className="flex flex-col gap-10 bg-gray-100 p-10 rounded-lg sticky top-5">
            <section className="flex flex-col">
              <h2 className="text-xl text-gray-800 font-bold mb-2">Órden</h2>
              <select
                onChange={(e) => {
                  router.push({ query: { ...query, ...JSON.parse(e.target.value) } }, undefined, {})
                }}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-2"
              >
                <option selected={query.sortKey === "TITLE" && query.reverse === "false" ? true : false} value={JSON.stringify({ sortKey: "TITLE", reverse: false })}>A - Z</option>
                <option selected={query.sortKey === "TITLE" && query.reverse === "true" ? true : false} value={JSON.stringify({ sortKey: "TITLE", reverse: true })}>Z - A</option>
                <option selected={query.sortKey === "BEST_SELLING" ? true : false} value={JSON.stringify({ sortKey: "BEST_SELLING", reverse: false })}>Mejor vendidos</option>
                <option selected={query.sortKey === "PRICE" && query.reverse === "false" ? true : false} value={JSON.stringify({ sortKey: "PRICE", reverse: false })}>Precio más bajo</option>
                <option selected={query.sortKey === "PRICE" && query.reverse === "true" ? true : false} value={JSON.stringify({ sortKey: "PRICE", reverse: true })}>Precio más alto</option>
              </select>
            </section>
            <section className="flex flex-col">
              <h2 className="text-xl text-gray-800 font-bold mb-2">Tostado</h2>
              <div className="flex flex-col gap-2 w-auto">
                <label>
                  <input defaultChecked type="checkbox" name="Ligero" id="" className="mr-2" />
                  Ligero
                </label>
                <label>
                  <input defaultChecked type="checkbox" name="Medio" id="" className="mr-2" />
                  Medio
                </label>

                <label>
                  <input type="checkbox" name="Oscuro" id="" className="mr-2" />
                  Oscuro
                </label>

                <label>
                  <input type="checkbox" name="Frances" id="" className="mr-2" />
                  Francés
                </label>
              </div>
            </section>
            <section className="flex flex-col">
              <h2 className="text-xl text-gray-800 font-bold mb-2">Casa Tostadoras</h2>
              <div className="w-full">
                <select
                  onChange={(e) => {
                    router.push({ query: { ...query, ...JSON.parse(e.target.value) } }, undefined, {})
                  }}
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-2"
                >
                  <option selected={!router.query.query} value={JSON.stringify({ query: "" })}>Todas</option>
                  <option selected={router.query.query === "Zaranda"} value={JSON.stringify({ query: "Zaranda" })}>Zaranda</option>
                </select>
              </div>
            </section>

          </div>
        </aside>
        <section className="md:w-full min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {
              !loading && data?.products?.edges?.map((product, index) => (
                <SmallProductCard
                  key={index}
                  title={product.node.title}
                  handle={product.node.handle}
                  price={product.node.priceRange.minVariantPrice.amount}
                  imageUrl={product.node.featuredImage.url}
                  altText={product.node.featuredImage.altText}
                />
              ))
            }
          </div>
          {
            loading &&
            <div className="h-full flex flex-col justify-center items-center">
              <TbLoader3 size={40} className="animate-spin text-4xl text-primary mx-auto mb-20" />
            </div>
          }
        </section>
      </div>
    </>
  )
}
Productos.layout = LayoutType.PUBLIC
export default Productos