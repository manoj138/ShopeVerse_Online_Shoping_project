import React from 'react';
import { useSelector } from 'react-redux';
import { Package, Calendar, MapPin, Truck, CheckCircle, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderStatusTracker = () => {
  const steps = [
    { label: "Order Placed", icon: Package, isActive: true, isDone: true },
    { label: "Processing", icon: CheckCircle, isActive: true, isDone: false },
    { label: "Shipped", icon: Truck, isActive: false, isDone: false },
    { label: "Delivered", icon: MapPin, isActive: false, isDone: false },
  ];

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative px-2 sm:px-10">
        <div className="absolute left-[5%] sm:left-[10%] top-1/2 -translate-y-1/2 w-[90%] sm:w-[80%] h-1 bg-gray-800 rounded-full"></div>
        <div className="absolute left-[5%] sm:left-[10%] top-1/2 -translate-y-1/2 w-[30%] sm:w-[26%] h-1 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
        
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${step.isActive ? 'border-[#1b2435] bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'border-[#1b2435] bg-gray-700'} transition-all`}>
                <Icon size={16} className={`${step.isActive ? 'text-white' : 'text-gray-400'}`} />
              </div>
              <span className={`text-[10px] sm:text-xs font-semibold ${step.isActive ? 'text-indigo-400' : 'text-gray-500'} absolute top-12 whitespace-nowrap text-center`}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const MyOrder = () => {
  const { orders } = useSelector((state) => state.order);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#050814] pb-20 px-4 sm:px-6 lg:px-20 text-white">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-gray-800/80">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Order History</h1>
            <p className="text-gray-400 mt-2 text-sm">Track, manage and review your purchases</p>
          </div>
          <div className="px-5 py-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400 font-semibold text-sm">
            Total Orders: {orders?.length || 0}
          </div>
        </div>

        {(!orders || orders.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-32 bg-gradient-to-b from-[#141a26] to-[#0f1624] rounded-3xl border border-gray-800/50 shadow-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full"></div>
            <div className="relative z-10 p-6 bg-gray-900/50 rounded-full mb-6 border border-gray-800">
              <ShoppingBag className="h-16 w-16 text-gray-500" />
            </div>
            <h2 className="relative z-10 text-3xl font-bold mb-3">No Orders Yet</h2>
            <p className="relative z-10 text-gray-400 mb-8 max-w-sm text-center">
              You haven't placed any orders. Start exploring our premium collection!
            </p>
            <Link to="/productpage" className="relative z-10 bg-white text-gray-900 px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl shadow-white/10">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="bg-gradient-to-br from-[#141a26] to-[#0f1624] rounded-3xl border border-gray-800/60 shadow-xl overflow-hidden hover:border-gray-700/80 transition-all duration-300">
                
                {/* Header */}
                <div className="bg-[#1b2435]/50 px-6 py-5 border-b border-gray-800/60 flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Order ID</span>
                    <span className="text-lg font-bold text-indigo-400">{order.id}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Date Placed</span>
                    <span className="text-sm font-medium">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Amount</span>
                    <span className="text-lg font-bold">₹{Number(order.total || 0).toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-6 lg:p-10">
                  
                  {/* Tracker */}
                  <div className="mb-14 pb-8 border-b border-gray-800/50">
                    <OrderStatusTracker />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Package size={20} className="text-indigo-400" />
                        Items Ordered ({order.items.length})
                      </h3>
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-5 p-4 rounded-2xl bg-[#0b1220]/50 border border-gray-800/40 hover:bg-[#111827] transition-colors group">
                          <img 
                            src={item.images?.[0] || "/fallback-image.png"} 
                            alt={item.name} 
                            className="w-20 h-20 object-contain rounded-xl bg-white p-1"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-base line-clamp-1 group-hover:text-indigo-400 transition-colors">{item.name}</h4>
                            <p className="text-xs text-gray-500 font-medium mb-2">{item.brand}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-gray-400">Qty: <span className="text-white font-semibold">{item.quantity}</span></span>
                              <span className="text-gray-400">Price: <span className="text-indigo-400 font-semibold">₹{item.price}</span></span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Info */}
                    <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-gray-800/50 pt-8 lg:pt-0 lg:pl-10 space-y-8">
                      <div>
                        <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                          <MapPin size={20} className="text-indigo-400" /> 
                          Shipping Details
                        </h3>
                        <div className="p-5 rounded-2xl bg-[#0b1220]/50 border border-gray-800/40 text-sm">
                          <p className="font-semibold text-white text-base mb-1">
                            {order.shippingInfo?.firstName} {order.shippingInfo?.lastName}
                          </p>
                          <p className="text-gray-400 mb-1">{order.shippingInfo?.email}</p>
                          <p className="text-gray-400 leading-relaxed">
                            {order.shippingInfo?.address}<br/>
                            {order.shippingInfo?.city}, {order.shippingInfo?.state} {order.shippingInfo?.zipCode}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                        <h4 className="font-bold text-sm mb-2 text-indigo-300">Need Help?</h4>
                        <p className="text-xs text-gray-400 mb-4">If you have any questions regarding this order, please contact our support team.</p>
                        <Link to="/contact" className="text-xs font-bold text-white bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg transition-colors flex w-fit items-center gap-1">
                          Contact Support <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
