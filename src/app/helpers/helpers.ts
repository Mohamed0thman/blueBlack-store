import { Color, ProductVariant, Size } from "../models";

export function converOptionToVariants(
  productName: string,
  colors: Color[],
  sizes: Size[]
) {
  const productVariant: ProductVariant[] = [];
  for (let c = 0; c < colors.length; c++) {
    for (let z = 0; z < sizes.length; z++) {
      productVariant.push({
        sku: `${productName}-${sizes[z].sizeName}-${colors[c].colorName}`,
        color: colors[c].colorValue,
        size: sizes[z].sizeValue,
        extraPrice: 0,
        image: "",
        quantity: 0,
      });
    }
  }
  return productVariant;
}
