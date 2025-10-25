// src/app/restaurant/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin, Clock, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

interface MenuItem {
  item_id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image_url?: string;
  is_available: boolean;
}

interface Restaurant {
  restaurant_id: string;
  name: string;
  address?: string;
  cuisine_type?: string;
  operating_hours?: string;
  rating: number;
}

export default function RestaurantMenuPage() {
  const router = useRouter();
  const params = useParams();
  const restaurantId = params.id as string;
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const { addItem, getTotalItems } = useCartStore();

  useEffect(() => {
    if (restaurantId) {
      fetchMenu();
    }
  }, [restaurantId]);

  const fetchMenu = async () => {
    try {
      const response = await fetch(`/api/menu/${restaurantId}`);
      const data = await response.json();
      setRestaurant(data.restaurant);
      setMenuItems(data.menuItems);
    } catch (error) {
      console.error('Error fetching menu:', error);
      toast.error('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    if (!restaurant) return;
    
    const quantity = quantities[item.item_id] || 1;
    
    addItem({
      id: item.item_id,
      name: item.name,
      price: item.price,
      quantity,
      restaurantId: restaurant.restaurant_id,
      restaurantName: restaurant.name,
      category: item.category,
      imageUrl: item.image_url,
    });

    toast.success(`${item.name} added to cart!`, {
      icon: '🛒',
      style: {
        background: '#dc2626',
        color: '#fff',
      },
    });
    
    setQuantities({ ...quantities, [item.item_id]: 1 });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    const current = quantities[itemId] || 1;
    const newQuantity = Math.max(1, Math.min(10, current + delta));
    setQuantities({ ...quantities, [itemId]: newQuantity });
  };

  // Group items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-700">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Restaurant not found</h2>
          <button
            onClick={() => router.push('/restaurant')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-100">
      {/* Restaurant Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.push('/restaurant')}
            className="flex items-center gap-2 text-red-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Restaurants
          </button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-display-large font-display font-bold mb-2">{restaurant.name}</h1>
                {restaurant.cuisine_type && (
                  <p className="text-body-elegant text-red-100 mb-2">🍛 {restaurant.cuisine_type}</p>
                )}
                {restaurant.address && (
                  <p className="text-red-100 flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" />
                    {restaurant.address}
                  </p>
                )}
                {restaurant.operating_hours && (
                  <p className="text-red-100 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {restaurant.operating_hours}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 fill-yellow-600" />
                <span className="text-xl font-bold">{restaurant.rating}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto px-4 py-12">
        {Object.entries(groupedItems).map(([category, items], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-heading-elegant font-elegant font-bold text-gray-900 mb-6 border-b-2 border-red-200 pb-2">
              {category}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.item_id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-red-100 hover:border-red-300 transition-all"
                >
                  {/* Item Image */}
                  <div className="h-48 bg-gradient-to-br from-red-300 to-orange-300 flex items-center justify-center text-6xl">
                    🍽️
                  </div>

                  <div className="p-5">
                    <h3 className="text-heading-elegant font-elegant font-bold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-red-600">
                        ₹{item.price}
                      </span>
                      {!item.is_available && (
                        <span className="text-xs text-red-600 font-semibold bg-red-50 px-2 py-1 rounded">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {item.is_available && (
                      <div className="space-y-2">
                        {/* Quantity Selector */}
                        <div className="flex items-center justify-center border-2 border-red-300 rounded-lg bg-red-50">
                          <button
                            onClick={() => updateQuantity(item.item_id, -1)}
                            className="p-2 hover:bg-red-100 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-red-600" />
                          </button>
                          <span className="px-6 font-bold text-red-600">
                            {quantities[item.item_id] || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.item_id, 1)}
                            className="p-2 hover:bg-red-100 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                        
                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Cart Button */}
      {getTotalItems() > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={() => router.push('/cart')}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-4 shadow-2xl flex items-center gap-3 font-semibold text-lg"
          >
            <ShoppingBag className="w-6 h-6" />
            View Cart ({getTotalItems()})
          </button>
        </motion.div>
      )}
    </div>
  );
}