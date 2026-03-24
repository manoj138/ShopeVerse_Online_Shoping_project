import React, { useEffect } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { AirVent, ArrowRight, Gift, Newspaper, Stars, TrendingUp, Zap } from "lucide-react";
import { useDispatch, useSelector, } from "react-redux";
import { fetchCategoriesAsync, fetchProductsAsync, setFilters, setProducts } from "../features/productSlice";
import CategoryCard from "../components/card/CategoryCard";
import { NavLink } from "react-router-dom";
import { ProductCard } from "../components/card/ProductCard";

const HomePage = () => {
  const {
    items: products,
    isLoading,
    categories,
    filteredItems,
    categoriesLoading,
    isInitialized,
    filters,
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  
useEffect(() => {
  dispatch(setFilters({ rating: 4 }));
}, [dispatch]);

  

  const featuredRating = filteredItems ? filteredItems.slice(5, 17) : []
  

  const featuredProducts = products ? products.slice(0, 8) : [];

  const featuredCategories = categories ? categories.slice(0, 12) : [];


  useEffect(() => {
    if (!isInitialized) {
      dispatch(setProducts());
      dispatch(fetchProductsAsync());
    }
  }, [isInitialized]);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);
  const heroSlides = [
    {
      id: 1,
      badge: "Up to 50% Off",
      title: "New Year Sale",
      description:
        "Start the year with amazing deals on electronics, fashion, and more!",
      buttonText: "Shop Now →",
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80",
      bgFrom: "from-purple-600",
      bgTo: "to-indigo-600",
    },
    {
      id: 2,
      badge: "Limited Offer",
      title: "Mega Fashion Sale",
      description: "Trending styles at unbeatable prices.",
      buttonText: "Explore →",
      image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80",
      bgFrom: "from-pink-600",
      bgTo: "to-purple-600",
    },
    {
      id: 3,
      badge: "New Arrivals",
      title: "Smart Gadgets 2026",
      description:
        "Discover the latest smart gadgets designed to make your life easier and smarter.",
      buttonText: "Discover →",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      bgFrom: "from-blue-600",
      bgTo: "to-violet-600",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-950">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        slidesPerView={1}
        spaceBetween={50}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        loop={true}
        grabCursor={true}
        className="h-[650px] relative z-10"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`h-[650px]  bg-gradient-to-r ${slide.bgFrom} ${slide.bgTo} flex items-center`}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full gap-10 text-white text-center lg:text-left mt-[-80px] lg:mt-0">
                <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
                  <span className="inline-block px-4 py-1.5 text-sm font-semibold tracking-wide rounded-full bg-white/20 backdrop-blur-sm border border-white/10 shadow-lg">
                    {slide.badge}
                  </span>

                  <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg">{slide.title}</h1>

                  <p className="text-lg text-white/90 leading-relaxed font-medium max-w-lg mx-auto lg:mx-0 drop-shadow">
                    {slide.description}
                  </p>

                  <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-300">
                    {slide.buttonText}
                  </button>
                </div>

                <div className="hidden lg:block w-[550px] h-[400px] overflow-hidden rounded-2xl shadow-2xl shadow-black/50 border border-white/10 transform hover:-translate-y-2 transition duration-500">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-950">
        {/* Card 1 */}
        <div className="flex items-center gap-4 p-5 bg-[#1f2937] rounded-xl shadow-md hover:shadow-indigo-500/30 hover:scale-105 transition">
          <div className="p-3 bg-indigo-600 rounded-full text-white">
            <Zap />
          </div>
          <span>
            <h1 className="text-lg font-semibold text-white">Flash Deals</h1>
            <p className="text-sm text-gray-400">Daily offers</p>
          </span>
        </div>

        {/* Card 2 */}
        <div className="flex items-center gap-4 p-5 bg-[#1f2937] rounded-xl shadow-md hover:shadow-indigo-500/30 hover:scale-105 transition">
          <div className="p-3 bg-indigo-600 rounded-full text-white">
            <Gift />
          </div>
          <span>
            <h1 className="text-lg font-semibold text-white">Free Gifts</h1>
            <p className="text-sm text-gray-400">On orders over ₹2000</p>
          </span>
        </div>

        {/* Card 3 */}
        <div className="flex items-center gap-4 p-5 bg-[#1f2937] rounded-xl shadow-md hover:shadow-indigo-500/30 hover:scale-105 transition">
          <div className="p-3 bg-indigo-600 rounded-full text-white">
            <TrendingUp />
          </div>
          <span>
            <h1 className="text-lg font-semibold text-white">Trending</h1>
            <p className="text-sm text-gray-400">Hot products</p>
          </span>
        </div>

        {/* Card 4 */}
        <div className="flex items-center gap-4 p-5 bg-[#1f2937] rounded-xl shadow-md hover:shadow-indigo-500/30 hover:scale-105 transition">
          <div className="p-3 bg-indigo-600 rounded-full text-white">
            <Stars />
          </div>
          <span>
            <h1 className="text-lg font-semibold text-white">New Arrivals</h1>
            <p className="text-sm text-gray-400">Fresh stock</p>
          </span>
        </div>
    
      </div>
<div className="px-6 py-12 bg-gray-950">

  {/* Heading */}
  <div className="flex flex-col justify-center items-center mb-8">
    <h2 className="text-4xl font-bold text-white  tracking-tight">
      Shop by Category
    </h2>

    <p className="mt-2 text-xl text-gray-400 leading-relaxed">
      Explore our wide range of categories and find exactly what you're looking for
    </p>
  </div>

  {/* Category Grid */}
  <div className=" grid
  grid-cols-1
  sm:grid-cols-3
  md:grid-cols-3
  lg:grid-cols-6
  gap-6
  p-4">
    {featuredCategories.map((category) => (
      <CategoryCard
        key={category.id}
        category={category}
      />
    ))}
  </div>

</div>

<div className="w-full px-6 py-10">
  <div className="flex items-center justify-between gap-6">

    {/* Left Content */}
    <div >
      <h2 className="text-4xl font-bold text-white">
        Featured Products
      </h2>
      <p className="text-sm text-gray-400 mt-2">
        Handpicked products just for you
      </p>
    </div>

    {/* View All Button */}
    <NavLink
      to="/productpage"
      className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-gray-200 rounded-lg hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition"
    >
      View All
      <ArrowRight size={18} />
    </NavLink>

  </div>
<div className="

  grid
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-6
  p-4
">
  {featuredProducts.map((product) => (
    <div key={product.id} className="flex justify-center">
      <ProductCard product={product} />
    </div>
  ))}
</div>

  
</div>

<div class="min-h-[420px] flex items-center justify-center ">
  <div
    class="relative w-full
           bg-gradient-to-r from-blue-900 via-indigo-600 to-pink-600
           p-10 md:p-16
           flex flex-col md:flex-row justify-between items-center gap-12
            overflow-hidden
           shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]
           group">

    <div class="absolute -top-24 -right-24 w-72 h-72 bg-pink-400/40 blur-3xl rounded-full"></div>
    <div class="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-400/40 blur-3xl rounded-full"></div>

    <div class="relative z-10 text-white max-w-xl group-hover:scale-105 transition-transform duration-300 ease-out
">
      <p class="uppercase  rounded-3xl p-2 text-sm bg-gray-400/40 w-40 font-bold text-white/70 shadow-2xl">
        Limited Time Offer
      </p>

      <h2 class="text-3xl md:text-5xl font-black leading-tight mt-4">
        Get <span class="text-yellow-300 drop-shadow">30% Off</span><br />
        Your First Order
      </h2>

      <p class="text-white/90 mt-5 text-lg leading-relaxed">
       Sign up now and get exclusive access to amazing deals and discounts.
      </p>

      <div class="mt-10 flex flex-wrap gap-5">
        <button
          class="px-5 py-3 rounded-full bg-white text-blue-700 font-bold
                 shadow-lg hover:shadow-xl hover:scale-110 transition-all">
          Sign Up Now
        </button>

        <button
          class="px-5 py-3 rounded-full border border-white/60
                 text-white font-semibold
                 hover:bg-white hover:text-blue-700
                 transition-all">
          Browse Products
        </button>
      </div>
    </div>

    <div class="relative z-10">
      <img
        src="../../public/accessories.jpg"
        alt="Accessories"
        class="w-[300px] md:w-[400px]
               rounded-3xl
               shadow-[0_30px_60px_rgba(0,0,0,0.4)]
               group-hover:scale-105 transition-transform duration-300 ease-out" />
    </div>
  </div>
</div>


<div className="w-full px-6 py-10">
  <div className="flex items-center justify-between h-50">
  <div>
    <h2 className="text-3xl font-bold text-white">
      New Arrivals
    </h2>
    <p className="text-sm text-gray-400 mt-1">
      Fresh off the shelf
    </p>
  </div>

  <NavLink
    to="/products"
    className="inline-flex items-center gap-2
               text-sm font-semibold text-blue-400
               hover:text-blue-300
               transition-colors"
  >
    View More →
  </NavLink>
</div>
</div>


{/* Top Rated Products */}

<div className="w-full px-6 py-10">
  <div className="flex items-center justify-between gap-6">
    <div>
      <h2 className="text-4xl font-bold text-white">
        Top Rated Products
      </h2>
      <p className="text-sm text-gray-400 mt-2">
        Loved by our customers
      </p>
    </div>

    <NavLink
      to="/productpage"
      className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
    >
      View All
      <span className="text-lg">→</span>
    </NavLink>
  </div>

  {/* Product Grid */}
  <div className="   grid
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  grid-rows-3
  gap-6
  p-4">
    {featuredRating.length > 0 ? (
      featuredRating.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))
    ) : (
      <p className="col-span-full text-center text-gray-500">
        No top-rated products found.
      </p>
    )}
  </div>
</div>

<div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 px-4 ">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-white">
      Stay Updated
    </h2>

    <p className="text-gray-400 mt-4">
      Subscribe to our newsletter for exclusive deals, new arrivals,
      and insider updates.
    </p>

    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full sm:w-96 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
      />

      <button className="px-8 py-3 rounded-full font-medium text-white bg-gradient-to-r from-blue-900 via-indigo-600 to-pink-600 hover:opacity-90 transition">
        Subscribe
      </button>
    </div>
  </div>
</div>
    </div>
  );
};

export default HomePage;
