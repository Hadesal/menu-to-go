export interface ProductData {
  id?: string;
  name: string;
  price: number;
  details: {
    detailsDescription: string;
    extras: ExtraData[];
    ingredients: IngredientData[];
    variants: {
      name: string;
      variantList: VariantData[];
    };
  };
  isAvailable: true;
  image: string | null;
  uniqueProductOrderingName: string;
}
export interface ExtraData {
  name: string;
  price: number;
}
export interface IngredientData {
  name: string;
  price?: number;
  image: string;
}
export interface VariantData {
  name: string;
  price: number;
}
