import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../features/wishlistSlice";
import { addToCart } from "../features/cartSlice";
import toast from "react-hot-toast";
import { Trash2, ShoppingCart, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const WishListPage = () => {
  const dispatch = useDispatch();
  const { wishListItems } = useSelector((state) => state.wishlist);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1220] to-[#050814] pb-20 px-6 text-white">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8">
        My Wishlist{" "}
        <span className="text-gray-400 text-xl">
          ({wishListItems.length} items)
        </span>
      </h1>

      {/* EMPTY */}
      {wishListItems.length === 0 && (
        <div className="flex flex-col items-center justify-center p-6 text-white text-center h-[50vh]">
          <div className="bg-[#141a26] p-12 rounded-3xl border border-gray-800 shadow-2xl flex flex-col items-center max-w-lg w-full">
            <div className="bg-pink-500/10 p-6 rounded-full mb-6">
              <Heart className="w-20 h-20 text-pink-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Create your dream collection by saving items you love. They'll be waiting here for you!
            </p>
            <Link 
              to="/productpage" 
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-pink-500/20 transform hover:-translate-y-1"
            >
              Browse Products
            </Link>
          </div>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-8">
        {wishListItems.map((item) => (
          <div
            key={item.id}
            className="relative bg-[#141a26] rounded-3xl p-5
                       shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                       hover:shadow-[0_30px_80px_rgba(99,102,241,0.25)]
                       transition-all duration-300 group"
          >
            {/* DISCOUNT */}
            {item.discountPercentage && (
              <span className="absolute top-4 left-4 bg-red-500 text-xs font-semibold px-3 py-1 rounded-full">
                -{Math.round(item.discountPercentage)}%
              </span>
            )}

            {/* IMAGE */}
            <div className=" flex items-center justify-center mb-4">
              <img
                src={item.images?.[0] || "/fallback-image.png"} // default image optional
                alt={item.name || item.title}
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* INFO */}
            <h2 className="font-semibold text-lg leading-tight mb-1">
              {item.title}
            </h2>

            <p className="text-sm text-gray-400 mb-2">{item.brand}</p>

            {/* RATING */}
            <div className="flex items-center gap-1 mb-3">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-gray-300">{item.rating}</span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl font-bold">₹{item.price}</span>
              {item.originalPrice && (
                <span className="line-through text-gray-500 text-sm">
                  ₹{item.originalPrice}
                </span>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  dispatch(addToCart({ ...item, quantity: 1 }));
                  dispatch(removeFromWishList(item.id));
                  toast.success("Moved to cart 🛒");
                }}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600
                           hover:from-indigo-600 hover:to-purple-700
                           text-white py-2 rounded-xl flex items-center justify-center gap-2
                           transition-all shadow-lg shadow-indigo-500/20"
              >
                <ShoppingCart size={18} />
                Move to Cart
              </button>

              <button
                onClick={() => dispatch(removeFromWishList(item.id))}
                className="p-2 rounded-xl bg-[#1c2230] hover:bg-red-500/20
                           transition-colors"
              >
                <Trash2 className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishListPage;
