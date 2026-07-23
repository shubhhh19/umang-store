"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import Breadcrumb from "@/components/Common/Breadcrumb";
import { formatInr } from "@/lib/format";
import { addItemToCart } from "@/redux/features/cart-slice";
import { AppDispatch } from "@/redux/store";
import { Product } from "@/types/product";

const ProductDetails = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const imageUrl = product.imgs?.previews[0] ?? "/images/products/product-1-bg-1.png";

  const handleAddToCart = () => {
    if (product.inStock === false) {
      toast.error("This product is out of stock");
      return;
    }

    dispatch(
      addItemToCart({
        ...product,
        quantity,
      })
    );
    toast.success("Added to cart");
  };

  return (
    <>
      <Breadcrumb title={product.title} pages={["shop", product.title]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:max-w-[570px] w-full">
              <div className="rounded-lg bg-white p-4 sm:p-8.5 shadow-1">
                <div className="relative flex items-center justify-center min-h-[420px] bg-[#F6F7FB] rounded-lg">
                  <Image
                    src={imageUrl}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="max-w-[570px] w-full">
              <div className="rounded-lg bg-white p-4 sm:p-8.5 shadow-1">
                <h1 className="font-semibold text-2xl sm:text-3xl text-dark mb-4">
                  {product.title}
                </h1>

                <p className="font-medium text-2xl text-dark mb-6">
                  {formatInr(product.price)}
                </p>

                <p className="text-dark-4 mb-6">
                  {product.inStock === false ? "Out of stock" : "In stock"}
                </p>

                {product.description ? (
                  <p className="text-dark leading-7 mb-8">{product.description}</p>
                ) : null}

                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <div className="flex items-center rounded-md border border-gray-3">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                      className="flex items-center justify-center w-11 h-11 text-dark hover:text-blue"
                    >
                      -
                    </button>
                    <span className="flex items-center justify-center w-12 h-11 border-x border-gray-3">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity((value) => value + 1)}
                      className="flex items-center justify-center w-11 h-11 text-dark hover:text-blue"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={product.inStock === false}
                    className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Add to Cart
                  </button>
                </div>

                <Link
                  href="/checkout"
                  className="inline-flex font-medium text-blue hover:text-blue-dark"
                >
                  Go to checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
