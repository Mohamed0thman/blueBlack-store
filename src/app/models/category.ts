export type Category = {
  categoryId?: string;
  categoryName: string;
  categoryOrder: number;
  subcategories: Subcategory[];
};

export type Subcategory = {
  subcategoryName: string;
  subcategoryOrder: number;
};
