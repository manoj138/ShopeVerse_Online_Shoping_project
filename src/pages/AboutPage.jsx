import {
  Award,
  CircleDotIcon,
  Eye,
  HeartHandshake,
  Truck,
  UserCircle2,
  UsersRound,
} from "lucide-react";
import React from "react";

const AboutPage = () => {  
  return (
    <>
      <div className="w-full flex flex-col text-white justify-center items-center bg-[#111827] py-16 space-y-20">
        
      
        <div className="text-center w-full space-y-5 py-20 bg-gradient-to-r from-[#4F46E5] to-[#9333EA] shadow-xl rounded-b-3xl">
          <h2 className="text-5xl font-bold tracking-tight drop-shadow-lg">About ShopVerse</h2>
          <p className="w-[90%] md:w-[70%] lg:w-[50%] mx-auto text-xl leading-relaxed text-white/90">
            We're on a mission to make online shopping accessible, enjoyable,
            and trustworthy for everyone.
          </p>
        </div>

        <div className="flex w-full px-5 justify-center">
          <div className="flex flex-wrap justify-between w-full gap-6">
            {[
              { value: "10k+", label: "Happy Customers" },
              { value: "50k+", label: "Products Sold" },
              { value: "100+", label: "Brand Partners" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-1 bg-gray-500/30 px-30 py-7 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <h2 className="text-4xl font-bold text-[#7C3AED]">{stat.value}</h2>
                <p className="text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col px-5 lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-5">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Founded in 2020, ShopVerse started with a simple idea: to create
              an online shopping experience that puts customers first. What
              began as a small startup has grown into a trusted e-commerce
              platform serving thousands of customers across India.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              We believe that everyone deserves access to quality products at
              fair prices, delivered with exceptional service. That's why we've
              partnered with over 100 brands to bring you the best selection of
              electronics, fashion, home goods, and more.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Today, we're proud to serve over 10,000 happy customers and
              continue to grow our product offerings while maintaining our
              commitment to quality and customer satisfaction.
            </p>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800" 
              alt="About ShopVerse" 
              className="w-full max-w-md h-auto rounded-2xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-500 ring-1 ring-gray-700"
            />
          </div>
        </div>

        <div className="flex w-full justify-center items-start gap-40 flex-col md:flex-row px-5">
          <div className="w-full md:w-[500px] space-y-3 bg-gray-800/50 p-6 rounded-xl shadow-lg hover:shadow-indigo-500/50 transition-shadow">
            <CircleDotIcon className="w-8 h-8 text-[#7C3AED]" />
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p className="text-sm leading-relaxed text-gray-300">
              To revolutionize online shopping by providing an unparalleled
              customer experience, offering quality products at competitive
              prices, and building lasting relationships with our customers and
              partners.
            </p>
          </div>

          <div className="w-full md:w-[500px] space-y-3 bg-gray-800/50 p-6 rounded-xl shadow-lg hover:shadow-indigo-500/50 transition-shadow">
            <Eye className="w-8 h-8 text-[#7C3AED]" />
            <h2 className="text-xl font-semibold">Our Vision</h2>
            <p className="text-sm leading-relaxed text-gray-300">
              To become India's most trusted and customer-centric e-commerce
              platform, where millions of customers find joy in discovering and
              purchasing products that enhance their lives.
            </p>
          </div>
        </div>

        <div className="space-y-10 px-5">
          <h2 className="text-2xl font-bold text-center">Our Values</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {[
              { Icon: Award, title: "Quality First", desc: "We never compromise on quality. Every product is carefully curated." },
              { Icon: Truck, title: "Fast Delivery", desc: "Quick and reliable delivery to your doorstep nationwide." },
              { Icon: HeartHandshake, title: "Customer Focus", desc: "Your satisfaction is our priority. We listen, we care, we deliver." },
              { Icon: UsersRound, title: "Community", desc: "Building a community of happy shoppers and trusted sellers." },
            ].map((val, idx) => (
              <div key={idx} className="space-y-3 bg-gray-800/40 p-6 rounded-xl shadow-md hover:shadow-indigo-500/40 transition-shadow transform hover:-translate-y-1 duration-300">
                <val.Icon className="mx-auto w-8 h-8 text-[#7C3AED]" />
                <h2 className="font-semibold">{val.title}</h2>
                <p className="text-sm text-gray-300">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10 px-5">
          <h2 className="text-2xl font-bold text-center">Meet Our Team</h2>

          <div className="flex justify-center items-start w-full flex-wrap gap-12 text-center">
            {[
              { name: "Rahul Sharma", role: "CEO & Founder" },
              { name: "Priya Patel", role: "Head of Operations" },
              { name: "Amit Kumar", role: "Tech Lead" },
              { name: "Sneha Gupta", role: "Marketing Director" },
            ].map((member, idx) => (
              <div key={idx} className="space-y-2 w-full sm:w-[320px] bg-gray-800/40 p-6 rounded-xl shadow-md hover:shadow-indigo-500/50 transition-shadow transform hover:-translate-y-1 duration-300">
                <UserCircle2 className="mx-auto w-12 h-12 text-[#7C3AED]" />
                <h2 className="font-semibold">{member.name}</h2>
                <p className="text-sm text-gray-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
