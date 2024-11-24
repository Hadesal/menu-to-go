export interface ProductData {
  id?: string;
  name: string;
  price: number;
  details: ProductDetailsData;
  isAvailable: boolean;
  image?: string | undefined;
  uniqueProductOrderingName: string;
}
export interface ExtrasData {
  id?: string;
  name: string;
  price: number;
}

export interface IngredientData {
  id?: string;
  name: string;
  price?: number;
  image: string | null;
}

export interface VariantData {
  id?: string;
  name: string;
  price: number;
}

export interface ProductDetailsData {
  id?: string;
  detailsDescription: string | null;
  variants: VariantsData;
  ingredients: IngredientData[];
  extras: ExtrasData[];
}

export interface VariantsData {
  name: string;
  variantList: VariantData[];
}
