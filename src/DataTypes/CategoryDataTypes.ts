import { ProductData } from "./ProductDataTypes";

export interface CategoryData {
  id?: string;
  name: string;
  image: string | null;
  products?: ProductData[];
  categoryType: string;
  categoryOrder?: number;
}
