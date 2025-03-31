export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients?: string[];
  available: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}