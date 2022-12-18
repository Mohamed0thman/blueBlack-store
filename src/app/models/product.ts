export type Product = {
  productId: string;
  productName: string;
  categoryName: string;
  subcategoryName: string;
  ProductPrice: number;
  productImage: string;
  productColors: string[];
  productSizes: string[];
  productVariant: ProductVariant[];
  totalQuantity: number;
  discount: number;
};

export type ProductVariant = {
  sku: string;
  color: string;
  size: string;
  extraPrice: number;
  galary: string[];
  quantity: number;
};
