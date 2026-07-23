export type Product = {
  id: string;
  slug: string;
  title: string;
  category?: string;
  reviews: number;
  price: number;
  discountedPrice: number;
  description?: string;
  inStock?: boolean;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
