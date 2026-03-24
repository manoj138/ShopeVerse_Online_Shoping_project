import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { addToCart, removeFromCart } from "../features/cartSlice";
import { Link } from "react-router-dom";

const SHIPPING = 99;
const GST_PERCENT = 18;

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = (subtotal * GST_PERCENT) / 100;
  const total = subtotal + SHIPPING + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#060b16] flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="bg-[#1b2435] p-12 rounded-3xl border border-gray-800 shadow-2xl flex flex-col items-center max-w-lg w-full">
          <div className="bg-indigo-500/10 p-6 rounded-full mb-6">
            <ShoppingBag className="w-20 h-20 text-indigo-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Looks like you haven't added anything to your cart yet. Discover our amazing products and find something you love!
          </p>
          <Link 
            to="/productpage" 
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20 transform hover:-translate-y-1"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#060b16] p-10 text-white">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart ({cartItems.length} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT – CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl bg-[#1b2435] p-6"
            >
              {/* IMAGE */}
              <div className="flex items-center gap-6">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="h-20 w-20 object-contain"
                />

                <div>
                  <h2 className="text-lg font-semibold">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {item.brand || "Essence"}
                  </p>

                  {/* QUANTITY */}
                  <div className="mt-3 flex items-center gap-4 rounded-xl border border-gray-600 px-4 py-2 w-fit">
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* PRICE + DELETE */}
              <div className="flex flex-col items-end gap-4">
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 />
                </button>

                <p className="text-xl font-bold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT – ORDER SUMMARY */}
        <div className="rounded-2xl bg-[#1b2435] p-6 h-fit">
          <h2 className="text-xl font-bold mb-5">
            Order Summary
          </h2>

          {/* COUPON */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="flex-1 rounded-xl bg-[#0f1625] px-4 py-3 text-sm outline-none"
            />
            <button className="rounded-xl border border-indigo-500 px-5 text-indigo-400 hover:bg-indigo-500 hover:text-white transition">
              Apply
            </button>
          </div>

          {/* PRICE DETAILS */}
          <div className="space-y-3 text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{SHIPPING}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (GST 18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
          </div>

          <hr className="my-5 border-gray-600" />

          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="block text-center w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-semibold hover:opacity-90">
            Proceed to Checkout →
          </Link>

          <button className="mt-4 w-full text-sm text-gray-400 hover:text-white">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
