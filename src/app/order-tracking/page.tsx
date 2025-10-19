// src/app/order-tracking/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Package, Truck, Home, Phone } from 'lucide-react';

interface Order {
  order_id: string;
  status: string;
  order_type: string;
  restaurant: {
    name: string;
  };
  customer: {
    name: string;
    phone_number: string;
  };
  deliveries?: Array<{
    driver: {
      name: string;
      phone_number: string;
      vehicle_number: string;
    };
    estimated_delivery_time: string;
  }>;
}

const orderStatuses = {
  pending: { label: 'Order Received', icon: Package, color: 'blue' },
  preparing: { label: 'Preparing', icon: Clock, color: 'yellow' },
  ready: { label: 'Ready', icon: CheckCircle, color: 'green' },
  out_for_delivery: { label: 'Out for Delivery', icon: Truck, color: 'purple' },
  delivered: { label: 'Delivered', icon: Home, color: 'green' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'green' }
};

export default function OrderTrackingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
      // Poll for updates every 10 seconds
      const interval = setInterval(fetchOrder, 10000);
      return () => clearInterval(interval);
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

  const getStatusSteps = () => {
    if (order?.order_type === 'delivery') {
      return ['pending', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
    }
    return ['pending', 'preparing', 'ready', 'completed'];
  };

  const getCurrentStepIndex = () => {
    const steps = getStatusSteps();
    return steps.indexOf(order?.status || 'pending');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const steps = getStatusSteps();
  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
              <h1 className="text-4xl font-bold mb-2">Track Your Order</h1>
              <p className="text-blue-100">Order ID: #{order.order_id.slice(0, 8)}</p>
            </div>

            {/* Order Status Timeline */}
            <div className="p-8">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-8 top-8 bottom-8 w-1 bg-gray-200">
                  <motion.div
                    className="bg-gradient-to-b from-blue-600 to-purple-600"
                    initial={{ height: 0 }}
                    animate={{ 
                      height: `${(currentStepIndex / (steps.length - 1)) * 100}%` 
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ width: '100%' }}
                  />
                </div>

                {/* Status Steps */}
                <div className="space-y-8 relative">
                  {steps.map((status, index) => {
                    const StatusInfo = orderStatuses[status as keyof typeof orderStatuses];
                    const StatusIcon = StatusInfo.icon;
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                      <motion.div
                        key={status}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-6"
                      >
                        {/* Status Icon */}
                        <motion.div
                          className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                              : 'bg-gray-200 text-gray-400'
                          } ${isCurrent ? 'ring-4 ring-blue-200' : ''}`}
                          animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <StatusIcon className="w-8 h-8" />
                        </motion.div>

                        {/* Status Label */}
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold ${
                            isCompleted ? 'text-gray-900' : 'text-gray-400'
                          }`}>
                            {StatusInfo.label}
                          </h3>
                          {isCurrent && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-sm text-blue-600 font-semibold mt-1"
                            >
                              In Progress...
                            </motion.p>
                          )}
                          {isCompleted && !isCurrent && (
                            <p className="text-sm text-green-600 font-semibold mt-1">
                              ✓ Completed
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Restaurant & Customer Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Restaurant Details
              </h3>
              <p className="text-lg font-semibold text-gray-800">{order.restaurant.name}</p>
              <p className="text-sm text-gray-500 mt-2">
                Your order is being prepared with care
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                Customer Details
              </h3>
              <p className="text-lg font-semibold text-gray-800">{order.customer.name}</p>
              <p className="text-sm text-gray-500 mt-1">{order.customer.phone_number}</p>
            </div>
          </div>

          {/* Delivery Driver Info (if delivery) */}
          {order.order_type === 'delivery' && order.deliveries && order.deliveries.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-600" />
                Delivery Partner
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {order.deliveries[0].driver.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.deliveries[0].driver.vehicle_number}
                  </p>
                </div>
                <a
                  href={`tel:${order.deliveries[0].driver.phone_number}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              </div>
            </motion.div>
          )}

          {/* Estimated Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg p-6 text-center"
          >
            <Clock className="w-12 h-12 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-2">Estimated Time</h3>
            <p className="text-xl">
              {order.order_type === 'delivery' 
                ? currentStepIndex >= 3 ? '10-15 minutes' : '35-45 minutes'
                : currentStepIndex >= 2 ? 'Ready for pickup' : '10-15 minutes'}
            </p>
          </motion.div>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-8 py-3 rounded-lg shadow-md transition-colors"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}