import { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetails from "@/components/ShopDetails/ProductDetails";
import { getProductBySlug } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export const dynamic = 'force-dynamic';


type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: `Product Not Found | ${siteConfig.name}`,
    };
  }

  return {
    title: `${product.title} | ${siteConfig.name}`,
    description: product.description || siteConfig.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ProductDetails product={product} />
    </main>
  );
}
