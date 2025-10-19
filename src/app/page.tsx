// src/app/restaurant/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, ChevronRight } from 'lucide-react';

interface Restaurant {
  restaurant_id: string;
  name: string;
  address?: string;
  cuisine_type?: string;
  operating_hours?: string;
  rating: number;
  image_url?: string;
}

export default function RestaurantListPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Discover Indian Restaurants
            </h1>
            <p className="text-red-100 text-lg">
              Choose from our curated selection of authentic Indian cuisine
            </p>
          </motion.div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.restaurant_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => router.push(`/restaurant/${restaurant.restaurant_id}`)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
            >
              {/* Restaurant Image */}
              <div className="relative h-56 bg-gradient-to-br from-red-400 to-orange-400">
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl">
                  🍛
                </div>
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-800">
                    {restaurant.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Restaurant Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {restaurant.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  {restaurant.cuisine_type && (
                    <div className="flex items-center text-gray-600">
                      <span className="text-red-600 mr-2">🍽️</span>
                      <span className="text-sm">{restaurant.cuisine_type}</span>
                    </div>
                  )}
                  
                  {restaurant.address && (
                    <div className="flex items-start text-gray-600">
                      <MapPin className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm line-clamp-2">{restaurant.address}</span>
                    </div>
                  )}
                  
                  {restaurant.operating_hours && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 text-red-600 mr-2" />
                      <span className="text-sm">{restaurant.operating_hours}</span>
                    </div>
                  )}
                </div>

                {/* View Menu Button */}
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 group">
                  View Menu
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {restaurants.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No restaurants found</p>
          </div>
        )}
      </div>
    </div>
  );
}