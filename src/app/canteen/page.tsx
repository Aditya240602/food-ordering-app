// src/app/canteen/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Coffee, Utensils } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

interface MenuItem {
  item_id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  is_available: boolean;
}

export default function CanteenPage() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [canteenId, setCanteenId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const { addItem, getTotalItems } = useCartStore();

  useEffect(() => {
    fetchCanteenMenu();
  }, []);

  const fetchCanteenMenu = async () => {
    try {
      // Fetch NSUT Canteen specifically
      const restaurantsRes = await fetch('/api/restaurants?canteen=true');
      const restaurants = await restaurantsRes.json();
      
      if (restaurants.length > 0) {
        const canteen = restaurants[0];
        setCanteenId(canteen.restaurant_id);
        
        const menuRes = await fetch(`/api/menu/${canteen.restaurant_id}`);
        const data = await menuRes.json();
        setMenuItems(data.menuItems);
      }
    } catch (error) {
      console.error('Error fetching canteen menu:', error);
      toast.error('Failed to load canteen menu');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    const quantity = quantities[item.item_id] || 1;
    
    addItem({
      id: item.item_id,
      name: item.name,
      price: item.price,
      quantity,
      restaurantId: canteenId,
      restaurantName: 'NSUT Canteen',
      category: item.category,
    });

    toast.success(`${item.name} added to cart!`, {
      icon: '🎉',
      style: {
        background: '#FF8C00',
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
  const snacks = menuItems.filter(item => item.category === 'Snacks');
  const beverages = menuItems.filter(item => item.category === 'Beverages');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-700">Loading canteen menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Canteen Header */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-700 text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-24 h-24 glass-effect-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Canteen Food"
                  className="w-16 h-16 rounded-xl object-cover"
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">NSUT Canteen</h1>
              <p className="text-xl text-orange-100 mb-4">
                Quick Bites, Great Taste!
              </p>
              <p className="text-orange-100 mb-6">
                🕐 Open 8:00 AM - 6:00 PM | 📍 NSUT Campus, Dwarka
              </p>
              <div className="inline-block glass-effect-light px-6 py-3 rounded-full">
                <span className="font-semibold text-lg">⚡ Takeaway Only</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="container mx-auto px-4 py-12">
        {/* Snacks Section */}
        {snacks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Utensils className="w-8 h-8 text-orange-400" />
              <h2 className="text-4xl font-display font-bold text-white">Snacks</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {snacks.map((item, index) => (
                <motion.div
                  key={item.item_id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="dark-surface rounded-xl shadow-lg overflow-hidden border-2 border-orange-500/20 hover:border-orange-400 transition-all"
                >
                  {/* Item Image */}
                  <div className="h-32 relative overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {item.name}
                    </h3>
                    
                    {item.description && (
                      <p className="text-xs text-gray-300 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-orange-400">
                        ₹{item.price}
                      </span>
                      {!item.is_available && (
                        <span className="text-xs text-red-400 font-semibold bg-red-500/20 px-2 py-1 rounded">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {item.is_available && (
                      <div className="space-y-2">
                        {/* Quantity Selector */}
                        <div className="flex items-center justify-center border-2 border-orange-400/30 rounded-lg bg-orange-500/10">
                          <button
                            onClick={() => updateQuantity(item.item_id, -1)}
                            className="p-2 hover:bg-orange-500/20 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-orange-400" />
                          </button>
                          <span className="px-4 font-bold text-orange-400">
                            {quantities[item.item_id] || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.item_id, 1)}
                            className="p-2 hover:bg-orange-500/20 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-orange-400" />
                          </button>
                        </div>
                        
                        {/* Add Button */}
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-full btn-canteen flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add to Order
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Beverages Section */}
        {beverages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Coffee className="w-8 h-8 text-orange-600" />
              <h2 className="text-4xl font-bold text-gray-900">Beverages</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {beverages.map((item, index) => (
                <motion.div
                  key={item.item_id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-yellow-200 hover:border-yellow-400 transition-all"
                >
                  <div className="h-32 bg-gradient-to-br from-yellow-300 to-orange-300 flex items-center justify-center text-5xl">
                    {item.name.includes('Tea') ? '☕' :
                     item.name.includes('Coffee') ? '🧋' : '🥤'}
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    
                    {item.description && (
                      <p className="text-xs text-gray-600 mb-3">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-orange-600">
                        ₹{item.price}
                      </span>
                    </div>

                    {item.is_available && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center border-2 border-orange-300 rounded-lg bg-orange-50">
                          <button
                            onClick={() => updateQuantity(item.item_id, -1)}
                            className="p-2 hover:bg-orange-100 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-orange-600" />
                          </button>
                          <span className="px-4 font-bold text-orange-600">
                            {quantities[item.item_id] || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.item_id, 1)}
                            className="p-2 hover:bg-orange-100 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-orange-600" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add to Order
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
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
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-4 shadow-2xl flex items-center gap-3 font-semibold text-lg"
          >
            <ShoppingBag className="w-6 h-6" />
            View Order ({getTotalItems()})
          </button>
        </motion.div>
      )}
    </div>
  );
}