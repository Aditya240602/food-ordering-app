'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Star, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Utensils, 
  Coffee, 
  Sparkles,
  ArrowRight,
  Play,
  Heart,
  Shield,
  Zap
} from 'lucide-react';
import Link from 'next/link';

interface Restaurant {
  restaurant_id: string;
  name: string;
  address?: string;
  cuisine_type?: string;
  operating_hours?: string;
  rating: number;
  image_url?: string;
}

export default function HomePage() {
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
      setRestaurants(data.slice(0, 6)); // Show only top 6 for homepage
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Delivery",
      description: "Get your food delivered in under 30 minutes with our premium delivery service."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Secure",
      description: "Contactless delivery and secure payment options for your peace of mind."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Fresh & Tasty",
      description: "Only the freshest ingredients from trusted local restaurants and vendors."
    }
  ];

  const stats = [
    { number: "500+", label: "Restaurants" },
    { number: "10k+", label: "Happy Customers" },
    { number: "50k+", label: "Orders Delivered" },
    { number: "4.8★", label: "Average Rating" }
  ];

    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 glass-effect-light px-6 py-3 rounded-full text-sm font-semibold text-orange-400 mb-6"
              >
                <Sparkles className="w-4 h-4" />
                India's Most Loved Food Delivery
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-display-large font-display font-bold mb-6"
              >
                <span className="gradient-text">Delicious</span>
                <br />
                <span className="text-white">Food</span>
                <br />
                <span className="text-orange-400">Delivered</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-body-elegant text-gray-300 mb-8 max-w-lg"
              >
                Experience the taste of authentic Indian cuisine delivered right to your doorstep. 
                From spicy curries to sweet desserts, we've got it all!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <button
                  onClick={() => router.push('/restaurant')}
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-3"
                >
                  <Utensils className="w-6 h-6" />
                  Order Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => router.push('/canteen')}
                  className="btn-secondary text-lg px-8 py-4 flex items-center justify-center gap-3"
                >
                  <Coffee className="w-6 h-6" />
                  Visit Canteen
                </button>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl shadow-2xl overflow-hidden animate-food-glow">
                  <img 
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Delicious Indian Food"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-3xl"></div>
                </div>
                
                {/* Floating Cards */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -top-4 -left-4 glass-effect rounded-2xl shadow-lg p-4 animate-glow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-green-400 fill-current" />
                    </div>
                    <div>
                      <p className="font-bold text-white">4.8 Rating</p>
                      <p className="text-sm text-gray-300">10k+ reviews</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="absolute -bottom-4 -right-4 glass-effect rounded-2xl shadow-lg p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white">30 Min</p>
                      <p className="text-sm text-gray-300">Delivery time</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 glass-effect">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display-medium font-display font-bold mb-6">
              Why Choose <span className="gradient-text">SwadSeva</span>?
            </h2>
            <p className="text-body-elegant text-gray-300 max-w-2xl mx-auto">
              We're committed to providing you with the best food delivery experience possible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="dark-surface rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 gradient-bg-food rounded-2xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-heading-elegant font-elegant font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-body-friendly text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-20 glass-effect">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display-medium font-display font-bold mb-6">
              Featured <span className="gradient-text">Restaurants</span>
            </h2>
            <p className="text-body-elegant text-gray-300 max-w-2xl mx-auto">
              Discover our top-rated restaurants serving authentic Indian cuisine
            </p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.restaurant_id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
              onClick={() => router.push(`/restaurant/${restaurant.restaurant_id}`)}
              className="dark-surface rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
            >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80&w=400&h=300&fit=crop&crop=center`}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4 glass-effect px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-white">
                    {restaurant.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-heading-elegant font-elegant font-bold text-white mb-2">
                  {restaurant.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  {restaurant.cuisine_type && (
                    <div className="flex items-center text-gray-300">
                          <span className="text-orange-400 mr-2">🍽️</span>
                      <span className="text-sm">{restaurant.cuisine_type}</span>
                    </div>
                  )}
                  
                  {restaurant.address && (
                    <div className="flex items-start text-gray-300">
                      <MapPin className="w-4 h-4 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm line-clamp-2">{restaurant.address}</span>
                    </div>
                  )}
                </div>

                <button className="w-full btn-primary flex items-center justify-center gap-2">
                  View Menu
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
          </div>
        )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/restaurant"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-3"
            >
              View All Restaurants
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-orange-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-display-medium font-display font-bold text-white mb-6">
              Ready to Order?
            </h2>
            <p className="text-body-elegant text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust SwadSeva for their food delivery needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/restaurant')}
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-3 text-lg shadow-lg"
              >
                <Utensils className="w-6 h-6" />
                Start Ordering
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => router.push('/canteen')}
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-3 text-lg"
              >
                <Coffee className="w-6 h-6" />
                Visit Canteen
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}