export interface ProductData {
  id: string;
  name: string;
  price: number;
  details: string | null;
  image: string | null;
  category: {
    id: string;
    name: string;
  };
}
