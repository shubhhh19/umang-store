import { type SanityImageSource } from '@sanity/image-url'

import { Product } from '@/types/product'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { productBySlugQuery, productsQuery } from '@/sanity/lib/queries'

export type SanityProductRecord = {
  _id: string
  title: string
  slug: string
  category?: string
  price: number
  discountedPrice?: number
  description?: string
  inStock: boolean
  image: SanityImageSource
}

export function mapSanityProduct(product: SanityProductRecord): Product {
  const imageUrl = urlFor(product.image).width(600).height(600).url()
  const salePrice = product.discountedPrice ?? product.price

  return {
    id: product._id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    discountedPrice: salePrice,
    reviews: 0,
    description: product.description,
    inStock: product.inStock,
    imgs: {
      thumbnails: [imageUrl],
      previews: [imageUrl],
    },
  }
}

export async function getProducts(): Promise<Product[]> {
  const products = await client.fetch<SanityProductRecord[]>(productsQuery)
  return products.map(mapSanityProduct)
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const product = await client.fetch<SanityProductRecord | null>(
    productBySlugQuery,
    { slug }
  )

  return product ? mapSanityProduct(product) : null
}
