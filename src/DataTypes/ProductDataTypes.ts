import {
  ExtraData,
  IngredientData,
  VariantData,
} from "./ProductDetailsDataTypes";

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
