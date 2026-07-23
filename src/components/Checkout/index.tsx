"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "@/components/Common/Breadcrumb";
import { formatInr } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import {
  removeAllItemsFromCart,
  selectCartItems,
  selectTotalPrice,
} from "@/redux/features/cart-slice";
import { AppDispatch } from "@/redux/store";

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const [isPaying, setIsPaying] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!customer.name || !customer.email || !customer.phone) {
      toast.error("Please fill in your contact details");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Payment gateway failed to load");
      return;
    }

    setIsPaying(true);

    try {
      const orderResponse = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalPrice }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Unable to create payment order");
      }

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: siteConfig.name,
        description: "Order payment",
        order_id: orderData.orderId,
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verifyResponse = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyResponse.json();

          if (!verifyResponse.ok) {
            toast.error(verifyData.error || "Payment verification failed");
            return;
          }

          dispatch(removeAllItemsFromCart());
          toast.success("Payment successful");
          router.push("/mail-success");
        },
        modal: {
          ondismiss: () => {
            setIsPaying(false);
          },
        },
      });

      razorpay.open();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <Breadcrumb title={"Checkout"} pages={["checkout"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {cartItems.length === 0 ? (
            <div className="bg-white shadow-1 rounded-[10px] p-8 text-center">
              <p className="text-dark mb-6">Your cart is empty.</p>
              <a
                href="/shop"
                className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md hover:bg-blue-dark"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
                <div className="lg:max-w-[670px] w-full">
                  <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
                    <h3 className="font-medium text-xl text-dark mb-6">
                      Contact Details
                    </h3>

                    <div className="flex flex-col gap-5">
                      <div>
                        <label htmlFor="name" className="block mb-2.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={customer.name}
                          onChange={(event) =>
                            setCustomer((current) => ({
                              ...current,
                              name: event.target.value,
                            }))
                          }
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block mb-2.5">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={customer.email}
                          onChange={(event) =>
                            setCustomer((current) => ({
                              ...current,
                              email: event.target.value,
                            }))
                          }
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block mb-2.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={customer.phone}
                          onChange={(event) =>
                            setCustomer((current) => ({
                              ...current,
                              phone: event.target.value,
                            }))
                          }
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-[455px] w-full">
                  <div className="bg-white shadow-1 rounded-[10px]">
                    <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                      <h3 className="font-medium text-xl text-dark">Your Order</h3>
                    </div>

                    <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between py-5 border-b border-gray-3"
                        >
                          <div>
                            <p className="text-dark">
                              {item.title} x {item.quantity}
                            </p>
                          </div>
                          <div>
                            <p className="text-dark text-right">
                              {formatInr(item.discountedPrice * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}

                      <div className="flex items-center justify-between pt-5">
                        <p className="font-medium text-lg text-dark">Total</p>
                        <p className="font-medium text-lg text-dark text-right">
                          {formatInr(totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isPaying}
                    className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5 disabled:opacity-60"
                  >
                    {isPaying ? "Processing..." : "Pay with Razorpay"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Checkout;
