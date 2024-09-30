import {
  ExtrasData,
  IngredientData,
  VariantData,
} from "./ProductDetailsDataTypes";

export interface ProductData {
  id?: string;
  name: string;
  price: number;
  details: {
    detailsDescription: string;
    extras: ExtrasData[];
    ingredients: IngredientData[];
    variants: {
      name: string;
      variantList: VariantData[];
    };
  };
  isAvailable: true;
  image: string | undefined;
  uniqueProductOrderingName: string;
}
