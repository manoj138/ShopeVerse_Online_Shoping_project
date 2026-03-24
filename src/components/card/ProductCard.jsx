import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from "../../features/wishlistSlice";
import toast from "react-hot-toast";
import { addToCart } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product, view = "grid" }) => {
  const { wishListItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const viewProductHandler = () => {
  navigate(`/product/${product.id}`);
};


  const isInWishlist = wishListItems?.some((item) => item.id === product.id);

  const addToWishListHandler = () => {
    if (isInWishlist) {
      dispatch(removeFromWishList(product.id));
      toast.error("Removed from wishlist 💔");
    } else {
      dispatch(addToWishList(product));
      toast.success("Added to wishlist ❤️");
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart( product ));
    toast.success("Product added to cart");
  };

  return (
    <div
      className={`group relative rounded-2xl bg-[#141a26] overflow-hidden transition-all duration-300
        ${view === "list"
  ? "grid grid-cols-[12rem_1fr] gap-6 p-4 w-full"
  : "w-full max-w-xs p-7 flex flex-col"
}
      `}
    >
      {/* TOP SHADOW OVERLAY ON HOVER */}
      {view === "grid" && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      )}

      {/* DISCOUNT */}
      {product.discount && (
        <span className="absolute top-3 left-3 z-20 rounded-lg bg-[#ff3b3b] px-2 py-1 text-xs font-bold text-white">
          -{product.discount}%
        </span>
      )}

      {/* GRID VIEW ICONS */}
      {view === "grid" && (
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={addToWishListHandler}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e2633] text-white hover:bg-gray-700 shadow-lg"
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist ? "text-red-500" : "text-gray-300"
              }`}
              fill={isInWishlist ? "currentColor" : "none"}
            />
          </button>

          <button onClick={viewProductHandler} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e2633] text-white hover:bg-gray-700 shadow-lg">
            <Eye className="h-5 w-5 text-gray-300" />
          </button>
        </div>
      )}

      {/* IMAGE + ADD TO CART (BELOW IMAGE) */}
      <div
        className={`relative ${
          view === "list" ? "w-48 h-48 flex-shrink-0" : "h-60 mb-4"
        } flex flex-col items-center justify-center`}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className={`h-full object-contain transition-transform duration-500 ${
            view === "grid" ? "group-hover:scale-105" : ""
          }`}
        />

        {/* ADD TO CART – IMAGE KHĀLI */}
        {view === "grid" && (
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            
            <button
              onClick={addToCartHandler}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-bold text-black shadow-xl hover:bg-gray-100"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="relative flex-1 flex flex-col justify-between">

        <div>
          <p className="text-sm font-medium text-[#5d5fef] mb-1">
            {product.brand || "FASHION TRENDS"}
          </p>

          <p className="font-bold text-white text-lg line-clamp-1">
            {product.name}
          </p>

          {/* DESCRIPTION – LIST VIEW */}
          {view === "list" && product.description && (
            <p className="text-gray-300 text-sm mt-2 line-clamp-3">
              {product.description}
            </p>
          )}

          {/* RATING */}
          <div className="flex items-center gap-2 text-sm mt-2">
            <div className="flex gap-0.5 text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= product.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-white font-semibold">
              {product.rating || "3.6"}
            </span>
            <span className="text-gray-500">
              ({product.reviewCount || 3})
            </span>

            
          </div>
              <p className="flex items-center gap-2 text-2xl font-bold text-white">
              ₹{product.price}
              {product.originalPrice && (
                <del className="text-base font-normal text-gray-500">
                  ₹{product.originalPrice}
                </del>
              )}
            </p>
        </div>

        {/* LIST VIEW PRICE + BUTTONS */}
        {view === "list" && (
          <div className="flex items-center justify-between mt-3">
            <p className="flex items-center gap-2 text-2xl font-bold text-white">
              ₹{product.price}
              {product.originalPrice && (
                <del className="text-base font-normal text-gray-500">
                  ₹{product.originalPrice}
                </del>
              )}
            </p>

            <div className="flex gap-2">
              <button
                onClick={addToCartHandler}
                className="flex items-center gap-2 rounded-xl bg-[#5d3cf3] px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
              >
                <ShoppingCart className="h-5 w-5" />
                Add
              </button>

              <button
                onClick={addToWishListHandler}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800 text-white hover:bg-gray-700"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isInWishlist ? "text-red-500" : ""
                  }`}
                  fill={isInWishlist ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};  
