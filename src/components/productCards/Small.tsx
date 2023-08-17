import { useState } from 'react';

// Shopify
import { CustomProduct } from 'types/shopify-sdk';

const SmallProductCard = ({ product }: { product: CustomProduct }) => {
  const [images, setImages] = useState(product.images)

  const { title, variants, handle } = product
  const { src: imageUrl } = images[0]
  const { price, compareAtPrice } = variants[0]

  return (
    <article className='flex flex-col gap-5'>
      <a href={`/products/${handle}`} className='block '>
        <img
          src={imageUrl}
          alt={product?.featuredImage?.altText}
        />

        <h5 className='text-center'>{title}</h5>
        <div className='flex justify-center items-center gap-2'>
          <span className='font-bold'>${price.amount}</span>

          {compareAtPrice?.amount &&
            <span className='line-through text-gray-400'>${compareAtPrice?.amount}</span>
          }
        </div>
      </a>
    </article>
  )
}

export default SmallProductCard