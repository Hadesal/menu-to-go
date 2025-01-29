import { ProductData } from "./ProductDataTypes";

export interface CategoryData {
  id?: string;
  name: string;
  image: string | File | null;
  products?: ProductData[];
  categoryType: string;
  categoryOrder?: number;
}
