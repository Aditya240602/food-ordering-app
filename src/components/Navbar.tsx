// src/components/Navbar.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Home, Store, UtensilsCrossed } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { getTotalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mode, setMode] = useState<'restaurant' | 'canteen'>('restaurant');

  useEffect(() => {
    const savedMode = localStorage.getItem('appMode') as 'restaurant' | 'canteen';
    if (savedMode) setMode(savedMode);
  }, []);

  const handleModeToggle = (newMode: 'restaurant' | 'canteen') => {
    setMode(newMode);
    localStorage.setItem('appMode', newMode);
    if (newMode === 'restaurant') {
      router.push('/restaurant');
    } else {
      router.push('/canteen');
    }
  };

  const cartItemCount = getTotalItems();

  return (
    <nav className="sticky top-0 z-50 glass-effect backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🍛
            </div>
            <span className="text-3xl font-display font-bold gradient-text">
              SwadSeva
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`flex items-center gap-2 font-semibold transition-all duration-300 ${
                pathname === '/' 
                  ? 'text-orange-600 scale-105' 
                  : 'text-gray-700 hover:text-orange-600 hover:scale-105'
              }`}
            >
              <Home className="w-5 h-5" />
              Home
            </Link>

            {/* Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-white/20">
              <button
                onClick={() => handleModeToggle('restaurant')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  mode === 'restaurant'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:text-red-600 hover:bg-white/50'
                }`}
              >
                <Store className="w-4 h-4" />
                <span className="font-semibold">Restaurants</span>
              </button>
              <button
                onClick={() => handleModeToggle('canteen')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  mode === 'canteen'
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-white/50'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span className="font-semibold">Canteen</span>
              </button>
            </div>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/80 backdrop-blur-sm text-gray-700 hover:text-orange-600 hover:bg-white/90 transition-all duration-300 shadow-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden mt-4 rounded-2xl bg-white/90 backdrop-blur-lg border border-white/20 shadow-xl"
            >
              <div className="py-6 px-6 space-y-4">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 font-semibold py-3 px-4 rounded-xl transition-all ${
                    pathname === '/' 
                      ? 'text-orange-600 bg-orange-50' 
                      : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      handleModeToggle('restaurant');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-4 rounded-xl font-semibold transition-all ${
                      mode === 'restaurant'
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Store className="w-5 h-5" />
                    Restaurants
                  </button>
                  <button
                    onClick={() => {
                      handleModeToggle('canteen');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-4 rounded-xl font-semibold transition-all ${
                      mode === 'canteen'
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <UtensilsCrossed className="w-5 h-5" />
                    Canteen
                  </button>
                </div>

                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-4 py-4 rounded-xl shadow-lg"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingCart className="w-5 h-5" />
                    Cart
                  </span>
                  {cartItemCount > 0 && (
                    <span className="bg-yellow-400 text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow-md">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}