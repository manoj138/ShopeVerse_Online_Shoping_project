import {
  Heart,
  ShoppingCart,
  Star,
  Share2,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { addToCart } from "../../features/cartSlice";
import {
  addToWishList,
  removeFromWishList,
} from "../../features/wishlistSlice";
import { fetchProductsAsync } from "../../features/productSlice";
import { ProductCard } from "../card/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const product = useSelector((state) =>
    state.products.items.find((p) => String(p.id) === String(id))
  );

  const relatedProducts = useSelector((state) =>
    state.products.items
      .filter(
        (p) => p.category === product?.category && p.id !== product?.id
      )
      .slice(0, 4)
  );

  const { wishListItems } = useSelector((state) => state.wishlist);
  const isInWishlist = wishListItems.some((item) => item.id === product?.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1220] text-gray-400">
        Loading product...
      </div>
    );
  }

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
    dispatch(addToCart({ ...product, qty }));
    toast.success("Product added to cart 🛒");
  };

  return (
    <div className="pb-20 px-4 sm:px-8 lg:px-20 min-h-screen bg-gradient-to-b from-[#0b1220] to-[#070b14] text-white animate-fade-in-up">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-6">
        Home / Products / {product.category} /{" "}
        <span className="text-white">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* IMAGE */}
        <div className="relative bg-[#141a26] rounded-3xl p-12 flex justify-center items-center transition-transform duration-500 hover:scale-[1.02]">
          {product.originalPrice && (
            <span className="absolute top-6 left-6 bg-red-500 text-sm px-3 py-1 rounded-full font-semibold">
              -10% OFF
            </span>
          )}

          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full max-w-md max-h-[420px] object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* DETAILS */}
        <div>
          <p className="text-indigo-400 font-medium mb-2">{product.brand}</p>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-5 w-5 ${
                    s <= product.rating ? "fill-yellow-400" : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-300">
              {product.rating} ({product.reviewCount || 3})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-4 mb-6">
            <span className="text-4xl font-bold">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <del className="text-xl text-gray-500">
                  ₹{product.originalPrice}
                </del>
                <span className="text-green-400 font-semibold">10% off</span>
              </>
            )}
          </div>

          <p className="text-gray-300 max-w-xl mb-8">{product.description}</p>

          {/* Quantity */}
          <div className="mb-8">
            <p className="font-semibold mb-3">Quantity</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-[#141a26] rounded-xl overflow-hidden">
                <button
                  disabled={qty === 1}
                  onClick={() => setQty(qty - 1)}
                  className="px-5 py-3 text-lg disabled:opacity-40"
                >
                  −
                </button>
                <span className="px-6">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-5 py-3 text-lg"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-400">99 items available</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mb-10">
            <button
              onClick={addToCartHandler}
              className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
            >
              <ShoppingCart />
              Add to Cart
            </button>

            <button
              onClick={addToWishListHandler}
              className="h-14 w-14 rounded-xl border border-gray-700 flex items-center justify-center transition-transform duration-300 hover:scale-110"
            >
              <Heart
                className={isInWishlist ? "text-red-500" : ""}
                fill={isInWishlist ? "currentColor" : "none"}
              />
            </button>

            <button className="h-14 w-14 rounded-xl border border-gray-700 flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <Share2 />
            </button>
          </div>

          {/* Info */}
          <div className="bg-[#141a26] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Truck className="text-indigo-400" />
              <div>
                <p className="font-semibold">Free Delivery</p>
                <p className="text-sm text-gray-400">
                  Est. delivery: 4 February 2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <RotateCcw className="text-indigo-400" />
              <div>
                <p className="font-semibold">Easy Returns</p>
                <p className="text-sm text-gray-400">30 day return policy</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Shield className="text-indigo-400" />
              <div>
                <p className="font-semibold">Secure Payment</p>
                <p className="text-sm text-gray-400">100% secure transaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>


  {/* TABS SECTION */}
  
        <div className="flex flex-wrap gap-4 sm:gap-10 border-b border-gray-700 mt-24 mb-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-4 font-semibold ${
              activeTab === "description"
                ? "text-indigo-400 border-b-2 border-indigo-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Description
          </button>

          <button
            onClick={() => setActiveTab("specifications")}
            className={`pb-4 font-semibold ${
              activeTab === "specifications"
                ? "text-indigo-400 border-b-2 border-indigo-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Specifications
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 font-semibold ${
              activeTab === "reviews"
                ? "text-indigo-400 border-b-2 border-indigo-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Reviews
          </button>
        </div>
     <div className=" bg-[#0f1624] rounded-3xl p-6 md:p-10 overflow-hidden">
        {/* TAB CONTENT */}
        {activeTab === "description" && (
          <>
            <p className="text-gray-300 leading-relaxed mb-6">
              {product.description ||
                "This premium beauty product is crafted to deliver long-lasting results with a smooth and flawless finish."}
            </p>

            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔</span> Beauty enhancement
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔</span> Long-lasting formula
              </li>
            </ul>
          </>
        )}

{activeTab === "specifications" && (
  <div className="text-gray-300 space-y-6">

    {/* Row 1 */}
    <div className="flex flex-col md:flex-row gap-10 py-4 border-b border-gray-700">

      <div className="flex justify-between w-full md:w-1/2">
        <p className="text-gray-400">Brand</p>
        <p className="font-medium">{product.brand}</p>
      </div>

      <div className="flex justify-between w-full md:w-1/2">
        <p className="text-gray-400">Category</p>
        <p className="font-medium">{product.category}</p>
      </div>

    </div>

    {/* Row 2 */}
    <div className="flex flex-col md:flex-row gap-10 py-4 border-b border-gray-700">

      <div className="flex justify-between w-full md:w-1/2">
        <p className="text-gray-400">Availability Status</p>
        <p className="text-green-400 font-medium">In Stock</p>
      </div>

      <div className="flex justify-between w-full md:w-1/2">
        <p className="text-gray-400">Shipping</p>
        <p className="font-medium">Ships in 3–5 business days</p>
      </div>

    </div>

  </div>
)}



        {activeTab === "reviews" && (
          <div className="text-gray-300">
            <p className="mb-4 font-semibold">
              {product.reviewCount || 3} Customer Reviews
            </p>

            <div className="space-y-4">
              <div className="bg-[#141a26] p-4 rounded-xl">
                ⭐⭐⭐⭐⭐
                <p className="text-sm text-gray-400 mt-2">
                  Amazing product! Totally worth the price.
                </p>
              </div>

              <div className="bg-[#141a26] p-4 rounded-xl">
                ⭐⭐⭐⭐☆
                <p className="text-sm text-gray-400 mt-2">
                  Quality is great, delivery was fast.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

{/* RELATED PRODUCTS */}
{relatedProducts.length > 0 && (
  <div className="mt-24">
    <h2 className="text-3xl font-bold mb-10">
      Related Products
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {relatedProducts.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          view="grid"
        />
      ))}
    </div>
  </div>
)}



     
    </div>
  );
};

export default ProductDetails;
