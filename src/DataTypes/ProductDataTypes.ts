export interface ProductData {
  id?: string;
  name: string;
  price: number;
  details: ProductDetailsData;
  isAvailable: boolean;
  image?: string | undefined;
}
export interface ExtrasData {
  id?: string;
  name: string;
  price: number;
}

export interface IngredientData {
  id?: string;
  name: string;
  image: string | null;
}

export interface VariantData {
  id?: string;
  name: string;
  price: number;
}
export interface Allergies {
  label: string;
  value: string;
}
export interface Labels {
  label: string;
  value: string;
}
export interface DietaryOptions {
  label: string;
  value: string;
}
export interface ProductDetailsData {
  id?: string;
  detailsDescription: string | null;
  allergies: Allergies[];
  labels: Labels[];
  dietaryOptions: DietaryOptions ;
  variants: VariantsData;
  ingredients: IngredientData[];
  extras: ExtrasData[];
}

export interface VariantsData {
  name: string;
  variantList: VariantData[];
}
