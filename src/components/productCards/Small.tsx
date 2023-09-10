import { useState } from 'react';

// Shopify
import { CustomProduct } from 'types/shopify-sdk';
import { ProductVariant } from 'shopify-buy';

interface SmallProductCardProps {
  handle: CustomProduct['handle'];
  title: CustomProduct['title'];
  imageUrl: ProductVariant['image']['url'] | ProductVariant['image']['originalSrc'] | ProductVariant['image']['src'];
  altText: ProductVariant['image']['altText'];
  priceRange?: CustomProduct['priceRange'];
  price?: ProductVariant['price'];
  compareAtPrice?: ProductVariant['compareAtPrice'];
}

const SmallProductCard = ({ handle, title, priceRange, imageUrl, altText, price, compareAtPrice }: SmallProductCardProps) => {

  console.log(priceRange?.minVariantPrice?.amount);
  console.log(price.amount);

  return (
    <article className='flex flex-col gap-5'>
      <a href={`/products/${handle}`} className='block '>
        <img
          src={imageUrl}
          alt={altText}
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
              {compareAtPrice &&
                <span className='text-gray-400 line-through my-0 mr-2'>MX${compareAtPrice.amount}</span>
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