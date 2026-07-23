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
  onSelectCategory?: (slug: string) => void;
}

const CategoryBarContent: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const searchParams = useSearchParams();
  const currentCategory =
    activeCategory || searchParams?.get("category") || "all";

  return (
    <div className="w-full bg-white border-y border-gray-2 shadow-xs py-4 my-6">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-2 text-custom-sm font-semibold text-dark-4 uppercase tracking-wider pr-2 border-r border-gray-3">
              Categories:
            </span>

            {categories.map((cat) => {
              const isActive = currentCategory === cat.slug;
              const targetHref =
                cat.slug === "all" ? "/shop" : `/shop?category=${cat.slug}`;

              if (onSelectCategory) {
                return (
                  <button
                    key={cat.slug}
                    onClick={() => onSelectCategory(cat.slug)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-custom-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "bg-blue text-white shadow-md shadow-blue/20 scale-[1.02]"
                        : "bg-gray-1 text-dark hover:bg-gray-2 hover:text-blue"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              }

              return (
                <Link
                  key={cat.slug}
                  href={targetHref}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-custom-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "bg-blue text-white shadow-md shadow-blue/20 scale-[1.02]"
                      : "bg-gray-1 text-dark hover:bg-gray-2 hover:text-blue"
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
            className="hidden md:inline-flex items-center gap-1.5 text-custom-sm font-semibold text-blue hover:text-blue-dark transition-colors duration-200 whitespace-nowrap"
          >
            <span>Explore All</span>
            <svg
              width="16"
              height="16"
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
    <Suspense fallback={<div className="h-16 my-6 bg-white border-y border-gray-2" />}>
      <CategoryBarContent {...props} />
    </Suspense>
  );
};

export default CategoryBar;
