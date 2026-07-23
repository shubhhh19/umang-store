export const productsQuery = `
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    price,
    discountedPrice,
    description,
    inStock,
    image
  }
`

export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    price,
    discountedPrice,
    description,
    inStock,
    image
  }
`
