export type AppMode = 'restaurant' | 'canteen';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
  imageUrl?: string;
  category?: string;
}

export interface Restaurant {
  restaurant_id: string;
  name: string;
  address?: string;
  cuisine_type?: string;
  rating: number;
  image_url?: string;
  is_canteen: boolean;
}

export interface MenuItem {
  item_id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image_url?: string;
  is_available: boolean;
}

export type OrderStatus = 
  | 'pending' 
  | 'preparing' 
  | 'ready' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'completed';