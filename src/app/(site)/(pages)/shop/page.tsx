import { Metadata } from "next";

import Shop from "@/components/Shop";
import { getProducts } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export const dynamic = 'force-dynamic';


export const metadata: Metadata = {
  title: `Shop | ${siteConfig.name}`,
  description: siteConfig.description,
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main>
      <Shop products={products} />
    </main>
  );
}
