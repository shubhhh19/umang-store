"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";
import { siteConfig } from "@/lib/site";

const HeroCarousal = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      <SwiperSlide>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <Image
                src={siteConfig.logo}
                alt={`${siteConfig.name} logo`}
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              Curated fashion, made simple
            </h1>

            <p className="text-dark-4">
              Discover the latest styles from {siteConfig.name}. Shop online with
              secure payments and fast checkout.
            </p>

            <Link
              href="/shop-without-sidebar"
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-gray-7 mt-10"
            >
              Shop Now
            </Link>
          </div>

          <div>
            <Image
              src="/images/hero/hero-01.png"
              alt="Umang fashion collection"
              width={351}
              height={358}
            />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-26 pl-4 sm:pl-7.5 lg:pl-12.5">
            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              New arrivals every week
            </h1>

            <p className="text-dark-4">
              Fresh looks for every occasion. Browse the collection and checkout
              with UPI, cards, and netbanking.
            </p>

            <Link
              href="/shop-without-sidebar"
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-gray-7 mt-10"
            >
              View Collection
            </Link>
          </div>

          <div>
            <Image
              src="/images/hero/hero-02.png"
              alt="Umang new arrivals"
              width={351}
              height={358}
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousal;
