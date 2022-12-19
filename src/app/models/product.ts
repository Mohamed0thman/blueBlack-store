export type Product = {
  productId: string;
  productName: string;
  categoryName: string;
  subcategoryName: string;
  ProductPrice: number;
  productImage: string;
  productColors: Color[];
  productSizes: Size[];
  productVariant: ProductVariant[];
  totalQuantity: number;
  discount: number;
};

export type ProductVariant = {
  sku: string;
  color: string;
  size: string;
  extraPrice: number;
  image: string;
  quantity: number;
};

export type Color = {
  colorName: string;
  colorValue: string;
};

export type Size = {
  sizeName: string;
  sizeValue: string;
};
