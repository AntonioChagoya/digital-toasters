import type { Product } from '@shopify/hydrogen-react/storefront-api-types';

const SmallProductCard = ({ product }: { product: Product }) => {

  return (
    <article>
      <img
        src={product?.featuredImage?.url}
        alt={product?.featuredImage?.altText}
        width={product?.featuredImage?.width}
        height={product?.featuredImage?.height}
      />

      <h4 className='text-center lg:text-left'>{product?.title}</h4>
    </article>
  )
}

export default SmallProductCard