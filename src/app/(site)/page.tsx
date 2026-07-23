import Home from "@/components/Home";
import { getProducts } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';


export const metadata: Metadata = {
  title: `${siteConfig.name} | Fashion Store`,
  description: siteConfig.description,
};

export default async function HomePage() {
  const products = await getProducts();

  return <Home products={products} />;
}
