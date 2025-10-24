// src/app/restaurant/page.tsx

'use client';
import { ChevronRight } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-orange-300 to-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-pink-300 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-yellow-300" />
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Discover <span className="text-yellow-300">Indian</span> Restaurants
              </h1>
              <p className="text-orange-100 text-xl max-w-2xl mx-auto">
                Choose from our curated selection of authentic Indian cuisine from top-rated restaurants
              </p>
            </motion.div>
          </div>
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
                onClick={() => router.push(`/restaurant/${restaurant.restaurant_id}`)}
                className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all border border-white/20 backdrop-blur-sm"
              >
                {/* Restaurant Image */}
                <div className="relative h-56 bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 flex items-center justify-center text-8xl">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-8xl">
                    🍛
                  </div>
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-800">
                      {restaurant.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Restaurant Info */}
                <div className="p-8">
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                    {restaurant.name}
                  </h2>

                  <div className="space-y-3 mb-6">
                    {restaurant.cuisine_type && (
                      <div className="flex items-center text-gray-600">
                        <span className="text-orange-600 mr-2">🍽️</span>
                        <span className="text-sm font-medium">{restaurant.cuisine_type}</span>
                      </div>
                    )}
                    
                    {restaurant.address && (
                      <div className="flex items-start text-gray-600">
                        <MapPin className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm line-clamp-2">{restaurant.address}</span>
                      </div>
                    )}
                    
                    {restaurant.operating_hours && (
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 text-orange-600 mr-2" />
                        <span className="text-sm">{restaurant.operating_hours}</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-lg">
                    View Menu
                    <ChevronRight className="w-5 h-5" />
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