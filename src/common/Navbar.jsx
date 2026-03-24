import { ChevronDown, Heart, ShoppingCart, UserRound, Menu, X, Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { logOut } from '../features/authSlice';
import { clearSearch, searchProducts } from '../features/productSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { wishListItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const { searchResults = [] } = useSelector((state) => state.product || {});

  const wishlistCount = wishListItems?.length || 0;
  const cartCount = cartItems?.length || 0;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const firstletter = user?.fname?.charAt(0)?.toUpperCase();

  const inputhandler = (e) => {
    dispatch(searchProducts(e.target.value));
  };

  const handleLogout = () => {
    dispatch(logOut());
    setIsProfileOpen(false);
    navigate("/");
  };

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/productpage' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className='fixed top-0 left-0 w-full z-50 bg-[#0b1220] lg:bg-[#0b1220]/80 lg:backdrop-blur-xl border-b border-white/5 text-white'>
      {/* Announcement Bar */}
      <div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-center py-1.5 text-[10px] md:text-xs font-medium tracking-wider uppercase animate-gradient-x'>
        🎉 New Year Sale! Use code <span className="font-bold">WELCOME10</span> for 10% off
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
          
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <h1 className="relative text-2xl font-black bg-gradient-to-br from-indigo-500 to-purple-600 px-3 py-1.5 rounded-xl text-white shadow-lg overflow-hidden">
                S
              </h1>
            </div>
            <h1 className="hidden sm:block text-2xl font-bold tracking-tight text-white/90">
              Shop<span className="text-indigo-500">Verse</span>
            </h1>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-all duration-300 hover:text-indigo-400 ${
                    isActive ? 'text-indigo-400' : 'text-gray-400'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              onChange={inputhandler}
              placeholder="Search products..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-gray-500"
            />
            
            {/* Results Dropdown */}
            {searchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-300">
                {searchResults.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      dispatch(clearSearch());
                      navigate(`/product/${product.id}`);
                    }}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white p-1 shrink-0 overflow-hidden">
                      <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.brand || "Exclusive"}</p>
                    </div>
                    <p className="text-sm font-bold text-indigo-400">₹{product.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2 md:gap-5">
            {/* Mobile Search Toggle */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Search className="h-6 w-6" />
            </button>

            <NavLink to="/wishlist" className="relative p-2 text-gray-400 hover:text-white transition-all hover:scale-110">
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-pink-500 text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full text-white ring-2 ring-[#0b1220]">
                  {wishlistCount}
                </span>
              )}
            </NavLink>

            <NavLink to="/cart" className="relative p-2 text-gray-400 hover:text-white transition-all hover:scale-110">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-indigo-500 text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full text-white ring-2 ring-[#0b1220]">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* Profile Dropdown */}
            <div className="relative">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all overflow-hidden group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm">
                      {firstletter}
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-500 group-hover:text-white transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="px-4 py-3 border-b border-white/5 mb-2">
                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Account</p>
                        <p className="text-sm font-bold text-white truncate mt-1">{user?.fname}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <NavLink to="/profile" className="flex items-center px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        My Profile
                      </NavLink>
                      <NavLink to="/order" className="flex items-center px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        My Orders
                      </NavLink>
                      <NavLink to="/wishlist" className="flex items-center px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        Wishlist
                      </NavLink>
                      <div className="border-t border-white/5 mt-2 pt-2">
                        <button onClick={handleLogout} className="flex items-center w-full px-4 py-2.5 text-sm text-pink-500 hover:bg-pink-500/10 transition-colors">
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <NavLink to="/login" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95">
                  <UserRound className="h-4 w-4" />
                  <span>Login</span>
                </NavLink>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Visible when toggled */}
        {isSearchOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top duration-300">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                onChange={inputhandler}
                placeholder="Search products..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                autoFocus
              />
              {searchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#111827] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-50">
                  {searchResults.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        dispatch(clearSearch());
                        navigate(`/product/${product.id}`);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-white/5"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white p-1 shrink-0">
                        <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-contain" />
                      </div>
                      <p className="text-xs font-medium text-white truncate flex-1">{product.name}</p>
                      <p className="text-xs font-bold text-indigo-400">₹{product.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sidebar Navigation */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/80" onClick={() => setIsMenuOpen(false)}></div>
        <div className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-[#0b1220] border-l border-white/10 p-6 shadow-2xl">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-10 mt-10">
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-lg font-medium tracking-wide transition-all ${
                      isActive ? 'text-indigo-400 pl-4 border-l-2 border-indigo-400' : 'text-gray-400 pl-4 border-l-2 border-transparent hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto pb-10">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-white/5">
                <p className="text-sm font-bold text-white mb-1">Exclusive Rewards</p>
                <p className="text-xs text-gray-500 mb-4">Join our membership for points & early access.</p>
                <NavLink to="/signup" className="block text-center bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 py-2 rounded-xl text-xs font-bold transition-all border border-indigo-600/30">
                  Join ShopVerse +
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
