import React from "react";
import Hero from "./Hero";
import CategoryBar from "./CategoryBar";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import BestSeller from "./BestSeller";
import { Product } from "@/types/product";

const Home = ({ products }: { products: Product[] }) => {
  return (
    <main>
      <Hero />
      <Categories />
      <NewArrival products={products} />
      <BestSeller products={products} />
    </main>
  );
};

export default Home;
