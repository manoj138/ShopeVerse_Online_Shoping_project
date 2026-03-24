import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, clearFilters } from "../../features/productSlice";
import { Star, X } from "lucide-react";

const ProductFilters = ({ onClose }) => {
  const dispatch = useDispatch();
  const { categories, brands, filters } = useSelector((state) => state.products);

  const handleCategoryChange = (category) => {
    dispatch(setFilters({ category }));
  };

  const handlePriceChange = (min, max) => {
    dispatch(setFilters({ priceRange: [min, max] }));
  };

  const handleBrandChange = (brandSlug) => {
    dispatch(setFilters({ brand: filters.brand === brandSlug ? "" : brandSlug }));
  };

  const handleRatingChange = (rating) => {
    dispatch(setFilters({ rating }));
  };

  const handleClearAll = () => {
    dispatch(clearFilters());
  };

  return (
    <aside className="w-full lg:w-64 p-6 rounded-2xl bg-[#141a26] text-white border border-white/5 shadow-2xl h-full lg:h-auto overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Filters
        </h2>
        <div className="flex items-center gap-3">
          <button className="text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors" onClick={handleClearAll}>
            Clear All
          </button>
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Category</h3>
        {categories.map((cat) => (
          <label
            key={cat.id}
            className="flex items-center justify-between mb-2 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat.slug}
                onChange={() => handleCategoryChange(cat.slug)}
                className="accent-blue-500"
              />
              <span>{cat.name}</span>
            </div>
            <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">
              {cat.count}
            </span>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-4 flex justify-between">
          Price Range <span>⌄</span>
        </h3>
        {[
          [0, 1000, "Under ₹1,000"],
          [1000, 5000, "₹1,000 - ₹5,000"],
          [5000, 10000, "₹5,000 - ₹10,000"],
          [10000, 25000, "₹10,000 - ₹25,000"],
          [25000, 50000, "₹25,000 - ₹50,000"],
          [50000, Infinity, "Above ₹50,000"],
        ].map(([min, max, label]) => (
          <label key={label} className="flex items-center gap-3 mb-3 cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={filters.priceRange?.[0] === min && filters.priceRange?.[1] === max}
              onChange={() => handlePriceChange(min, max)}
              className="accent-yellow-400"
            />
            <span className="text-sm">{label}</span>
          </label>
        ))}
      </div>

      <hr className="border-gray-700 mb-6" />

      <div className="mb-6">
        <h3 className="font-semibold mb-4 flex justify-between">
          Brand <span>⌄</span>
        </h3>
        <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
          {brands.map((brand) => (
            <label key={brand.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brand === brand.slug}
                onChange={() => handleBrandChange(brand.slug)}
                className="accent-yellow-400"
              />
              <span className="text-sm">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-700 mb-6" />

     


<div className="mb-6">
  <h3 className="font-semibold mb-2 text-white">Customer Rating</h3>

  <div className="flex flex-col gap-1">
    {[4, 3, 2, 1].map((rating) => (
      <label
        key={rating}
        className="flex items-center gap-2 cursor-pointer"
      >
        <input
          type="radio"
          name="rating"
          className="h-3 w-3"
          checked={filters.rating === rating}
          onChange={() => handleRatingChange(rating)}
        />

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
              }`}
            />
          ))}
          <span className="text-white font-semibold text-sm">{rating}.0 & Up</span>
        </div>
      </label>
    ))}
  </div>
</div>



    </aside>
  );
};

export default ProductFilters;
