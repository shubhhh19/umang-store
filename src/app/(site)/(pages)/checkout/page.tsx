import React from "react";
import Checkout from "@/components/Checkout";
import { siteConfig } from "@/lib/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Checkout | ${siteConfig.name}`,
  description: siteConfig.description,
};

const CheckoutPage = () => {
  return (
    <main>
      <Checkout />
    </main>
  );
};

export default CheckoutPage;
