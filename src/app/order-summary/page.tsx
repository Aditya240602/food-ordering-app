// src/app/order-summary/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Clock, MapPin, Phone, Home } from 'lucide-react';

interface Order {
  order_id: string;
  order_date: string;
  total_amount: number;
  status: string;
  order_type: string;
  restaurant: {
    name: string;
    address: string;
  };
  customer: {
    name: string;
    phone_number: string;
  };
  order_items: Array<{
    quantity: number;
    price_at_order_time: number;
    menu_item: {
      name: string;
    };
  }>;
}

export default function OrderSummaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders?orderId=${orderId}`);
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h2>
          <button
            onClick={() => router.push('/')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto"
        >
          {/* Success Header */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <CheckCircle className="w-20 h-20 mx-auto mb-4" />
              </motion.div>
              <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-green-100 text-lg">
                Your order has been successfully placed
              </p>
            </div>

            {/* Order Details */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6 pb-6 border-b-2">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order ID</p>
                  <p className="text-xl font-bold text-gray-900">#{order.order_id.slice(0, 8)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">₹{order.total_amount.toFixed(2)}</p>
                </div>
              </div>

              {/* Customer & Restaurant Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Restaurant
                  </h3>
                  <p className="text-gray-700">{order.restaurant.name}</p>
                  {order.restaurant.address && (
                    <p className="text-sm text-gray-500 flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5" />
                      {order.restaurant.address}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    Your Details
                  </h3>
                  <p className="text-gray-700">{order.customer.name}</p>
                  <p className="text-sm text-gray-500">{order.customer.phone_number}</p>
                </div>
              </div>

              {/* Order Type Badge */}
              <div className="mb-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  order.order_type === 'delivery'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {order.order_type === 'delivery' ? (
                    <Home className="w-5 h-5" />
                  ) : (
                    <Package className="w-5 h-5" />
                  )}
                  <span className="font-semibold">
                    {order.order_type === 'delivery' ? 'Home Delivery' : 'Takeaway'}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-3">
                  {order.order_items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{item.menu_item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900">
                        ₹{(item.price_at_order_time * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimated Time */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-bold text-gray-900">Estimated Time</p>
                    <p className="text-gray-600">
                      {order.order_type === 'delivery' 
                        ? '45-50 minutes for delivery'
                        : '15-20 minutes for preparation'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => router.push(`/order-tracking?orderId=${order.order_id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Track Order
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <p className="text-gray-700 text-lg mb-2">
              🙏 Thank you for ordering with <span className="font-bold">SwadSeva</span>
            </p>
            <p className="text-gray-500">
              A confirmation has been sent to your phone
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}