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
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-3xl">🍛</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              SwadSeva
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`flex items-center gap-2 font-semibold transition-colors ${
                pathname === '/' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              <Home className="w-5 h-5" />
              Home
            </Link>

            {/* Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleModeToggle('restaurant')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  mode === 'restaurant'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                <Store className="w-4 h-4" />
                <span className="font-semibold">Restaurants</span>
              </button>
              <button
                onClick={() => handleModeToggle('canteen')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  mode === 'canteen'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:text-orange-500'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span className="font-semibold">Canteen</span>
              </button>
            </div>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-red-600"
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
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 font-semibold py-2 ${
                    pathname === '/' ? 'text-red-600' : 'text-gray-700'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleModeToggle('restaurant');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 w-full px-4 py-3 rounded-lg font-semibold ${
                      mode === 'restaurant'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700'
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
                    className={`flex items-center gap-2 w-full px-4 py-3 rounded-lg font-semibold ${
                      mode === 'canteen'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <UtensilsCrossed className="w-5 h-5" />
                    Canteen
                  </button>
                </div>

                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between bg-red-600 text-white font-semibold px-4 py-3 rounded-lg"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Cart
                  </span>
                  {cartItemCount > 0 && (
                    <span className="bg-yellow-400 text-gray-900 text-sm font-bold px-2 py-1 rounded-full">
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