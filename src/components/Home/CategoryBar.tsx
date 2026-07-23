"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const categories = [
  { name: "All Products", slug: "all", icon: "✨" },
  { name: "Lehngas", slug: "lehngas", icon: "👗" },
  { name: "Readymade Suits", slug: "readymade-suits", icon: "👘" },
  { name: "Fabric Suits", slug: "fabric-suits", icon: "🧵" },
];

interface CategoryBarProps {
  activeCategory?: string;
}

const CategoryBarContent: React.FC<CategoryBarProps> = ({ activeCategory }) => {
  const searchParams = useSearchParams();
  const currentCategory =
    activeCategory || searchParams?.get("category") || "all";

  return (
    <div className="w-full bg-[#f8f9fc] border-t border-gray-3 py-2">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-2xs font-bold text-dark-4 uppercase tracking-wider pr-3 border-r border-gray-3">
              Categories
            </span>

            {categories.map((cat) => {
              const isActive = currentCategory === cat.slug;
              const targetHref =
                cat.slug === "all" ? "/shop" : `/shop?category=${cat.slug}`;

              return (
                <Link
                  key={cat.slug}
                  href={targetHref}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "bg-blue text-white shadow-xs"
                      : "bg-white text-dark hover:bg-gray-1 hover:text-blue border border-gray-3"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-blue hover:text-blue-dark transition-colors duration-200 whitespace-nowrap"
          >
            <span>View All</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CategoryBar: React.FC<CategoryBarProps> = (props) => {
  return (
    <Suspense fallback={<div className="h-10 bg-[#f8f9fc] border-t border-gray-3" />}>
      <CategoryBarContent {...props} />
    </Suspense>
  );
};

export default CategoryBar;
