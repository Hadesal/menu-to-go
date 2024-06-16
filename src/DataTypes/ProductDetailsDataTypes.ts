export interface ProductDetailsData {
  id: string;
  detailsDescription: string | null;
  variants: any | null;
  ingredients: IngredientData[];
  extras: ExtraData[];
}

export interface IngredientData {
  id: string;
  name: string;
  image: string | null;
}

export interface ExtraData {
  id: string;
  name: string;
  price: number;
}
export interface VariantsData {
  id: number;
  name: string;
  variantList: VariantData[];
  productDetailsId: number;
}

export interface VariantData {
  id: number;
  name: string;
  price: number;
}
