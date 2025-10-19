// src/app/restaurant/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, ChefHat } from 'lucide-react';

interface Restaurant {
  restaurant_id: string;
  name: string;
  address?: string;
  cuisine_type?: string;
  operating_hours?: string;
  rating: number;
  image_url?: string;
  is_canteen: boolean;
}

export default function RestaurantListPage() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants?canteen=false');
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-700">Loading restaurants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <ChefHat className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-3">Discover Indian Restaurants</h1>
            <p className="text-xl text-red-100">
              Choose from our curated selection of authentic Indian cuisine
            </p>
          </motion.div>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="container mx-auto px-4 py-12">
        {restaurants.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No restaurants available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.restaurant_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => router.push(`/restaurant/${restaurant.restaurant_id}`)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
              >
                {/* Restaurant Image */}
                <div className="h-48 bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center text-6xl">
                  🍽️
                </div>

                {/* Restaurant Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {restaurant.name}
                    </h2>
                    <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                      <span className="font-bold text-yellow-700">
                        {restaurant.rating}
                      </span>
                    </div>
                  </div>

                  {restaurant.cuisine_type && (
                    <p className="text-gray-600 mb-4 flex items-center gap-2">
                      🍛 {restaurant.cuisine_type}
                    </p>
                  )}

                  {restaurant.address && (
                    <p className="text-sm text-gray-500 mb-2 flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{restaurant.address}</span>
                    </p>
                  )}

                  {restaurant.operating_hours && (
                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {restaurant.operating_hours}
                    </p>
                  )}

                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors">
                    View Menu →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}