import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsAsync,
  fetchCategoriesAsync,
  clearFilters,
} from "../../features/productSlice";
import { ProductCard } from "../card/ProductCard";
import { Grid3x3, List, Filter } from "lucide-react";
import ProductFilters from "./ProductFilters";
import { toast, Toaster } from "react-hot-toast";

const ITEMS_PER_PAGE = 12;

const ProductPage = () => {
  const dispatch = useDispatch();
  const { filteredItems = [], isLoading } = useSelector(
    (state) => state.products,
  );

  const [currentPage, setCurrentPage] = useState(null);
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  /* ✅ PAGINATION FIX (ONLY CHANGE) */
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredItems]);

  /* ================= SORT ================= */
  const sortedItems = useMemo(() => {
    const items = [...filteredItems];
    switch (sortBy) {
      case "priceLow":
        return items.sort((a, b) => a.price - b.price);
      case "priceHigh":
        return items.sort((a, b) => b.price - a.price);
      case "name":
        return items.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return items;
    }
  }, [filteredItems, sortBy]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);

  // Ensure startIndex is never negative or overflow
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = sortedItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 8;

    const totalToShow = Math.min(totalPages, maxPagesToShow);

    for (let i = 1; i <= totalToShow; i++) {
      pages.push(i);
    }

    return pages;
  };

  /* ================= TOAST ================= */
  const handleAddToCart = (product) => {
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-[#0b1220] min-h-screen relative">
      <Toaster position="top-right" />

      {/* MOBILE FILTER OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[60] lg:hidden transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* FILTERS SIDEBAR */}
      <div 
        className={`fixed inset-y-0 left-0 w-[280px] bg-[#141a26] z-[70] transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-72 lg:z-0 lg:bg-transparent ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="sticky top-[120px] h-full lg:h-auto overflow-y-auto lg:overflow-visible">
          <ProductFilters onClose={() => setIsSidebarOpen(false)} />
        </div>
      </div>

      {/* PRODUCTS */}
      <main className="flex-1 text-white text-center">
        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8 bg-[#141a26] p-6 rounded-3xl shadow-2xl border border-white/5 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            {/* VIEW TOGGLE */}
            <div className="flex gap-2 bg-[#0b1220] p-1.5 rounded-xl border border-white/5">
              <button
                onClick={() => setView("grid")}
                className={`p-2.5 rounded-lg transition-all duration-300 ${
                  view === "grid" 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Grid3x3 size={20} />
              </button>

              <button
                onClick={() => setView("list")}
                className={`p-2.5 rounded-lg transition-all duration-300 ${
                  view === "list" 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <List size={20} />
              </button>
            </div>

            {/* MOBILE FILTER TOGGLE */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-[#0b1220] px-4 py-2.5 rounded-xl border border-white/5 text-gray-300 hover:text-white transition-all font-medium"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          {/* SORT & STATS */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm text-gray-400 font-medium whitespace-nowrap">
              Showing <span className="text-white font-bold">{currentProducts.length}</span> of <span className="text-white font-bold">{sortedItems.length}</span> products
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto bg-[#0b1220] text-white px-6 py-2.5 rounded-xl border border-white/5 
               focus:outline-none focus:ring-2 focus:ring-indigo-500/50 
               hover:bg-[#111827] transition-all duration-300 cursor-pointer text-sm font-medium"
            >
              <option value="" className="bg-[#0b1220]">Sort By</option>
              <option value="priceLow" className="bg-[#0b1220]">Price: Low to High</option>
              <option value="priceHigh" className="bg-[#0b1220]">Price: High to Low</option>
              <option value="name" className="bg-[#0b1220]">Name</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS GRID/LIST */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 opacity-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
            <p className="text-lg font-medium">Curating amazing products...</p>
          </div>
        ) : sortedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-[#141a26] rounded-3xl border border-white/5 shadow-2xl">
            <p className="text-xl text-gray-400 mb-4">No products found matching your filters.</p>
            <button 
              onClick={() => dispatch(clearFilters())}
              className="bg-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8"
                : "flex flex-col gap-6"
            }
          >
            {currentProducts.map((product) => (
              <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ProductCard
                  product={product}
                  view={view}
                  onAddToCart={() => handleAddToCart(product)}
                />
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-3 mt-16 bg-[#141a26] p-4 rounded-2xl border border-white/5 shadow-xl w-fit mx-auto">
            {/* Prev Button */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-sm ${
                currentPage === 1
                  ? "bg-[#0b1220] text-gray-600 cursor-not-allowed border border-white/5"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"
              }`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {getPageNumbers().map((page, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[40px] h-10 flex items-center justify-center rounded-xl transition-all duration-300 text-sm font-bold ${
                    currentPage === page
                      ? "bg-white text-indigo-600 shadow-xl scale-110 border border-white"
                      : "bg-[#0b1220] text-gray-400 hover:text-white hover:bg-white/5 border border-white/5"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-sm ${
                currentPage === totalPages
                  ? "bg-[#0b1220] text-gray-600 cursor-not-allowed border border-white/5"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductPage;
