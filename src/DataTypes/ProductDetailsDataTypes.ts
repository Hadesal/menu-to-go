export interface ExtraData {
  id: string;
  name: string;
  price: number;
}

export interface IngredientData {
  id: string;
  name: string;
  price?: number;
  image: string | null;
}

export interface VariantData {
  id: string;
  name: string;
  price: number;
}

export interface ProductDetailsData {
  id: string;
  detailsDescription: string | null;
  variants: VariantsData;
  ingredients: IngredientData[];
  extras: ExtraData[];
}

export interface VariantsData {
  id: number;
  name: string;
  variantList: VariantData[];
  productDetailsId: number;
}
