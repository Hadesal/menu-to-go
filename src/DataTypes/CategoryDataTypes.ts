export interface CategoryData {
  id: string;
  name: string;
  image: ArrayBuffer | null;
  products: [];
  restaurant: object;
  restaurantId: string;
  categoryType: string;
}
