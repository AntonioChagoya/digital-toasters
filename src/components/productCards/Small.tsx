// Shopify
import { Product } from '@shopify/hydrogen-react/storefront-api-types';

const SmallProductCard = ({ product }: { product: Product }) => {
  const { title, handle, priceRange, images, compareAtPriceRange, variants } = product;
  const { price, image } = variants.edges[0].node;

  return (
    <article className='flex flex-col gap-5'>
      <a href={`/products/${handle}`} className='block '>
        <img
          src={image.src}
          alt={image.altText}
          className='rounded'
        />

        <h5 className='text-center pt-3 pb-2'>{title}</h5>
        <div className='text-center'>
          {priceRange ?
            <>
              <span className='text-gray-400 mr-2'>Desde</span>
              <span className='text-primary text-xl font-bold'>MX${priceRange?.minVariantPrice.amount}</span>
            </>
            :
            <>
              {compareAtPriceRange &&
                <span className='text-gray-400 line-through my-0 mr-2'>MX${compareAtPriceRange.minVariantPrice.amount}</span>
              }
              <span className='text-primary font-bold text-xl my-0'>MX${price.amount}</span>
            </>
          }
        </div>
      </a>
    </article>
  )
}

export default SmallProductCard