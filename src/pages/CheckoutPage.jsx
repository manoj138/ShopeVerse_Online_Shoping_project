import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cartSlice";
import { addOrder } from "../features/orderSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SHIPPING = 99;
const GST_PERCENT = 18;

const CheckoutPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "card",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = (subtotal * GST_PERCENT) / 100;
  const total = subtotal + SHIPPING + tax;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      id: "ORD-" + Math.floor(Math.random() * 1000000),
      date: new Date().toISOString(),
      items: [...cartItems],
      subtotal,
      shipping: SHIPPING,
      tax,
      total,
      shippingInfo: { ...formData },
    };

    dispatch(addOrder(orderData));
    toast.success("Order placed successfully!");
    dispatch(clearCart());
    navigate("/order");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen mt-30 bg-gradient-to-b from-[#0b1220] to-[#060b16] p-10 text-white flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <Link
          to="/"
          className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold hover:opacity-90"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-30 bg-gradient-to-b from-[#0b1220] to-[#060b16] p-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT – SHIPPING & PAYMENT */}
        <div className="lg:col-span-2 space-y-6">
          <form
            className="space-y-6"
            onSubmit={handlePlaceOrder}
            id="checkout-form"
          >
            {/* Shipping Information */}
            <div className="rounded-2xl bg-[#1b2435] p-6">
              <h2 className="text-xl font-bold mb-5">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    First Name
                  </label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full rounded-xl bg-[#0f1625] px-4 py-3 text-sm outline-none"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Last Name
                  </label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full rounded-xl bg-[#0f1625] px-4 py-3 text-sm outline-none"
                    placeholder="Doe"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-xl bg-[#0f1625] px-4 py-3 text-sm outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">
                    Street Address
                  </label>
                  <input
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full rounded-xl bg-[#0f1625] px-4 py-3 text-sm outline-none"
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    City
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full rounded-xl bg-[#0f1625] px-4 py-3 text-sm outline-none"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    State
                  </label>
                  <input
                    required
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full rounded-xl bg-[#0f1625] px-4 py-3 text-sm outline-none"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    ZIP / Postal Code
                  </label>
                  <input
                    required
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full rounded-xl bg-[#0f1625] px-4 py-3 text-sm outline-none"
                    placeholder="123456"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl bg-[#1b2435] p-6">
              <h2 className="text-xl font-bold mb-5">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-600 cursor-pointer hover:bg-[#0f1625] transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-indigo-500"
                  />
                  <span className="font-semibold">Credit / Debit Card</span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-600 cursor-pointer hover:bg-[#0f1625] transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === "upi"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-indigo-500"
                  />
                  <span className="font-semibold">UPI (GPay, PhonePe)</span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-600 cursor-pointer hover:bg-[#0f1625] transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-indigo-500"
                  />
                  <span className="font-semibold">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT – ORDER SUMMARY */}
        <div className="rounded-2xl bg-[#1b2435] p-6 h-fit">
          <h2 className="text-xl font-bold mb-5">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-sm">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <hr className="my-5 border-gray-600" />

          {/* PRICE DETAILS */}
          <div className="space-y-3 text-gray-300 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{SHIPPING.toFixed(2)}</span>
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

          <button
            form="checkout-form"
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-semibold hover:opacity-90 transition shadow-lg shadow-indigo-500/30"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
