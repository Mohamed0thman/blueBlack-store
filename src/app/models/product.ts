export type Product = {
  productId: string;
  productName: string;
  ProductPrice: number;
  productImage: string;
  productColors: string[];
  productSizes: string[];
  productVariant?: ProductVariant[];
};

export type ProductVariant = {
  sku: string;
  color: string;
  size: string;
  extraPrice: number;
  galary: string[];
};
