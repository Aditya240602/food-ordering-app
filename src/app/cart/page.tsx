// src/app/cart/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Coffee, Utensils } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    restaurantName,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    router.push('/checkout');
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toast.success('Cart cleared!');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-6xl mx-auto mb-8 animate-float">
            🛒
          </div>
          <h2 className="text-display-medium font-display font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-body-elegant text-gray-600 mb-8">
            Add some delicious items to get started on your culinary journey!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/restaurant')}
              className="btn-primary px-8 py-4 text-lg flex items-center justify-center gap-3"
            >
              <Utensils className="w-5 h-5" />
              Browse Restaurants
            </button>
            <button
              onClick={() => router.push('/canteen')}
              className="btn-canteen px-8 py-4 text-lg flex items-center justify-center gap-3"
            >
              <Coffee className="w-5 h-5" />
              Visit Canteen
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-3 text-gray-600 hover:text-orange-600 mb-6 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </button>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-display-large font-display font-bold gradient-text mb-3">
                Your Cart
              </h1>
              <p className="text-body-elegant text-gray-600">
                Ordering from <span className="font-elegant font-semibold text-orange-600">{restaurantName}</span>
              </p>
            </div>
            
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-red-50 transition-all"
            >
              <Trash2 className="w-5 h-5" />
              Clear Cart
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-white/20"
              >
                <div className="flex items-center gap-8">
                  {/* Item Image/Icon */}
                  <div className="w-28 h-28 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0 shadow-lg">
                    🍽️
                  </div>

                  {/* Item Details */}
                  <div className="flex-1">
                    <h3 className="text-heading-elegant font-elegant font-bold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    {item.category && (
                      <p className="text-sm text-orange-600 font-medium mb-3">{item.category}</p>
                    )}
                    <p className="text-xl font-bold text-orange-600">
                      ₹{item.price} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center border-2 border-orange-200 rounded-xl bg-orange-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-3 hover:bg-orange-100 transition-colors rounded-l-xl"
                      >
                        <Minus className="w-5 h-5 text-orange-600" />
                      </button>
                      <span className="px-6 font-bold text-gray-900 min-w-[4rem] text-center text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-3 hover:bg-orange-100 transition-colors rounded-r-xl"
                      >
                        <Plus className="w-5 h-5 text-orange-600" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        removeItem(item.id);
                        toast.success('Item removed from cart');
                      }}
                      className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8 border border-white/20">
              <h2 className="text-heading-elegant font-elegant font-bold text-gray-900 mb-8">
                Order Summary
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex justify-between text-gray-700 py-2">
                  <span className="text-lg">Items ({getTotalItems()})</span>
                  <span className="font-bold text-lg">₹{getTotalPrice().toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-700 py-2">
                  <span className="text-lg">Taxes & Charges</span>
                  <span className="font-bold text-lg">₹{(getTotalPrice() * 0.05).toFixed(2)}</span>
                </div>

                <div className="border-t-2 border-orange-200 pt-6">
                  <div className="flex justify-between text-2xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-orange-600">
                      ₹{(getTotalPrice() * 1.05).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3 mb-6"
              >
                Proceed to Checkout
                <ArrowRight className="w-6 h-6" />
              </button>

              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl mb-4">
                <p className="text-green-800 text-center font-medium">
                  🎉 You're saving ₹{(getTotalPrice() * 0.1).toFixed(2)} on this order!
                </p>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p className="flex items-center justify-center gap-2">
                  💳 We accept all payment methods
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}