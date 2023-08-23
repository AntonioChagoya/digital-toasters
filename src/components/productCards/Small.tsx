import { useState } from 'react';

// Shopify
import { CustomProduct } from 'types/shopify-sdk';
import { ProductVariant } from 'shopify-buy';

interface SmallProductCardProps {
  handle: CustomProduct['handle'];
  title: CustomProduct['title'];
  compareAtPriceRange?: CustomProduct['compareAtPriceRange'];
  imageUrl: ProductVariant['image']['url'] | ProductVariant['image']['originalSrc'] | ProductVariant['image']['src'];
  altText: ProductVariant['image']['altText'];
  price: ProductVariant['price']['amount'];
}

const SmallProductCard = ({ handle, title, price, imageUrl, altText }: SmallProductCardProps) => {

  return (
    <article className='flex flex-col gap-5'>
      <a href={`/products/${handle}`} className='block '>
        <img
          src={imageUrl}
          alt={altText}
          className='rounded'
        />

        <h5 className='text-center'>{title}</h5>
        <div className='flex justify-center items-center gap-2'>
          <span className='font-bold'>${price}</span>

          {/* {compareAtPriceRange &&
            <>
              <span className=' '>${compareAtPriceRange?.maxVariantPrice.amount}</span>
              <span> - </span>
              <span className=' '>${compareAtPriceRange?.minVariantPrice.amount}</span>
            </>
          } */}
        </div>
      </a>
    </article>
  )
}

export default SmallProductCard