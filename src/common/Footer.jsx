import {
  CreditCard,
  Facebook,
  Headphones,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  PhoneCall,
  Shield,
  Truck,
  Twitter,
  ArrowRight
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0b1220] text-gray-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-white/5">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over ₹999", color: "text-indigo-400", bg: "bg-indigo-500/10" },
            { icon: Shield, title: "Secure Payment", desc: "100% protected payments", color: "text-purple-400", bg: "bg-purple-500/10" },
            { icon: Headphones, title: "24/7 Support", desc: "Expert help anytime", color: "text-pink-400", bg: "bg-pink-500/10" },
            { icon: CreditCard, title: "Easy Returns", desc: "30-day return policy", color: "text-blue-400", bg: "bg-blue-500/10" },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 group cursor-default">
              <div className={`p-4 rounded-2xl ${feature.bg} transition-transform group-hover:scale-110 duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm tracking-wide">{feature.title}</h3>
                <p className="text-xs mt-0.5 opacity-80">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <NavLink to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="h-10 w-10 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white font-black text-xl shadow-lg transition-transform group-hover:rotate-12">
                S
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Shop<span className="text-indigo-500">Verse</span>
              </h2>
            </NavLink>
            <p className="text-sm leading-relaxed max-w-xs">
              Curating the finest selection of premium products for your lifestyle. Experience the future of online shopping with ShopVerse.
            </p>
            <div className="flex gap-4 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button key={i} className="p-2 rounded-lg bg-white/5 hover:bg-indigo-600/20 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">Explore</h3>
            <ul className="space-y-4">
              {['Home', 'Products', 'Trending', 'New Arrivals'].map((link) => (
                <li key={link}>
                  <NavLink to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-sm hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">
                    {link}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">Customer Service</h3>
            <ul className="space-y-4">
              {['Help Center', 'Track Order', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <NavLink to={`/${link.toLowerCase().replace(" ", "")}`} className="text-sm hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">
                    {link}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">Stay Connected</h3>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-all shadow-lg active:scale-95">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 rounded-lg bg-white/5"><PhoneCall className="w-4 h-4 text-indigo-400" /></div>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 rounded-lg bg-white/5"><Mail className="w-4 h-4 text-indigo-400" /></div>
                <span>hello@shopverse.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] md:text-xs">
          <p>© 2026 ShopVerse Global Ltd. Designed for Excellence.</p>
          <div className="flex gap-6">
            <NavLink to="/privacy" className="hover:text-white transition">Privacy</NavLink>
            <NavLink to="/term" className="hover:text-white transition">Terms</NavLink>
            <NavLink to="/cookies" className="hover:text-white transition">Cookies</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
