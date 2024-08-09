export interface ProductData {
  id?: string;
  name: string;
  price: number;
  details: {
    detailsDescription: string;
    extras: object[];
    ingredients: object[];
  };
  isAvailable: true;
  image: string | null;
  uniqueProductOrderingName: string;
}
