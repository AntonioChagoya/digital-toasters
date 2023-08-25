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
  const [roasted, setRoasted] = useState([])
  const [toaster, setToaster] = useState([])

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

  useEffect(() => {
    const newQuery = [...roasted, ...toaster].join(" AND ") || router.query.query

    console.log("roasted", roasted);
    console.log("toaster", toaster);

    if (roasted.length < 1 && toaster.length < 1) {
      router.push({ query: { ...query, query: null } }, undefined, {})
    } else {
      router.push({ query: { ...query, query: newQuery } }, undefined, {})
    }

  }, [roasted, toaster])

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
                  <input
                    onChange={(e) => {
                      console.log(e.target.checked);
                      console.log("roasted", roasted.filter((roast) => roast !== e.target.value));

                      if (e.target.checked) {
                        setRoasted((roasted) => ([...roasted, e.target.value]))
                      } else {
                        setRoasted((roasted) => (roasted.filter((roast) => roast !== e.target.value)))
                      }
                    }}
                    value="Ligero"
                    type="checkbox"
                    name="Ligero"
                    id=""
                    className="mr-2" />
                  Ligero
                </label>
                <label>
                  <input
                    value={"Medio"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRoasted((roasters) => ([...roasters, e.target.value]))
                      } else {
                        setRoasted((roasters) => (roasters.filter((roaster) => roaster !== e.target.value)))
                      }
                    }}
                    type="checkbox" name="Medio" id="" className="mr-2" />
                  Medio
                </label>

                <label>
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRoasted((roasters) => ([...roasters, e.target.value]))
                      } else {
                        setRoasted((roasters) => (roasters.filter((roaster) => roaster !== e.target.value)))
                      }
                    }}
                    value="Oscuro"
                    type="checkbox" name="Oscuro" id="" className="mr-2" />
                  Oscuro
                </label>

                <label>
                  <input onChange={(e) => {
                    if (e.target.checked) {
                      setRoasted((roasters) => ([...roasters, e.target.value]))
                    } else {
                      setRoasted((roasters) => (roasters.filter((roaster) => roaster !== e.target.value)))
                    }
                  }} value="frances" type="checkbox" name="Frances" id="" className="mr-2" />
                  Francés
                </label>
              </div>
            </section>
            <section className="flex flex-col">
              <h2 className="text-xl text-gray-800 font-bold mb-2">Casa Tostadora</h2>
              <div className="w-full">
                <select
                  name="toaster"
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setToaster([])
                    } else {
                      setToaster((toasters) => ([...toasters, e.target.value]))
                    }
                  }}
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-2"
                >
                  <option selected={!router.query.query} value="">Todas</option>
                  <option selected={router.query.query === "Zaranda"} value="Zaranda">Zaranda</option>
                </select>
              </div>
            </section>

          </div>
        </aside >
        <section className="relative md:w-full">
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
            <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center">
              <TbLoader3 size={40} className="animate-spin text-4xl text-primary mx-auto" />
            </div>
          }
        </section>
      </div >
    </>
  )
}
Productos.layout = LayoutType.PUBLIC
export default Productos