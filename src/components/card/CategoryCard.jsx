import React from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "../../features/productSlice";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setFilters({ category: category.slug }));
   navigate("")
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex flex-col items-center gap-2 py-5 rounded-xl border border-gray-700 bg-gray-800 shadow-sm
      hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-200"
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-lg text-indigo-600 text-4xl">
        {category.icon}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-between">
        <span className="text-white font-semibold text-sm hover:text-indigo-600 transition-colors">
          {category.name}
        </span>

        <span className="text-xs font-medium text-gray-500 px-2 py-1 rounded-full">
          {category.count} items
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
