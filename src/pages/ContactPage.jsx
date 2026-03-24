import { MessageCircle, MapPin, PhoneCall, Mail, Clock, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

const faqs = [
  { question: "How do I track my order?", answer: "You can track your order by logging into your account and checking the 'Orders' section." },
  { question: "What is your return policy?", answer: "Products can be returned within 14 days in their original condition." },
  { question: "How can I contact customer support?", answer: "You can use the live chat support on this page or email us at support@shopverse.com." },
  { question: "Do you offer international shipping?", answer: "Yes, we ship to over 50 countries worldwide." },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", subject: "", message: ""
  });

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleFaq = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent successfully!");
    setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="w-full text-white bg-[#0B0E14] min-h-screen font-sans pb-20">
      
      {/* Hero Section */}
      <div className="text-center py-24 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] px-4 shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4 animate-fadeIn">Get in Touch</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90 animate-fadeIn delay-200">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      {/* Top Info Cards */}
      <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <MapPin />, title: "Visit Us", content: "123 Shopping Street\nMumbai, Maharashtra 400001\nIndia" },
          { icon: <PhoneCall />, title: "Call Us", content: "+91 98765 43210\n+91 12345 67890\nToll Free: 1800-123-4567" },
          { icon: <Mail />, title: "Email Us", content: "support@shopverse.com\nsales@shopverse.com\ncareers@shopverse.com" },
          { icon: <Clock />, title: "Working Hours", content: "Monday - Friday: 9AM - 8PM\nSaturday: 10AM - 6PM\nSunday: Closed" }
        ].map((card, i) => (
          <div
            key={i}
            className="bg-[#161B22] p-8 rounded-xl border border-gray-800 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:border-indigo-500"
          >
            <div className="bg-[#1C1F26] p-3 rounded-lg text-[#7C3AED] mb-4 text-2xl">{card.icon}</div>
            <h3 className="text-xl font-bold mb-3">{card.title}</h3>
            <p className="text-gray-400 text-sm whitespace-pre-line leading-relaxed">{card.content}</p>
          </div>
        ))}
      </div>

      {/* Contact Form & Map */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-[#161B22] p-8 rounded-xl border border-gray-800 shadow-lg hover:shadow-indigo-600 transition-shadow">
          <h2 className="text-2xl font-bold mb-8 text-gradient-to-r from-[#4F46E5] to-[#9333EA] bg-clip-text text-transparent">Send us a Message</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full bg-[#0B0E14] border border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none transition-all hover:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full bg-[#0B0E14] border border-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none transition-all hover:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-[#0B0E14] border border-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none transition-all hover:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full bg-[#0B0E14] border border-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none transition-all hover:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-[#0B0E14] border border-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none appearance-none transition-all hover:border-indigo-500"
              >
                <option value="">Select a subject</option>
                <option value="Support">Support</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="w-full bg-[#0B0E14] border border-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none transition-all hover:border-indigo-500"
              ></textarea>
            </div>
            <button className="w-full bg-gradient-to-r from-[#6366F1] to-[#A855F7] py-3 rounded-lg font-bold hover:opacity-90 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Send Message
            </button>
          </form>
        </div>

        {/* Map & Chat */}
        <div className="space-y-8">
          <div className="rounded-xl overflow-hidden h-[300px] border border-gray-800 shadow-lg hover:shadow-indigo-600 transition-shadow">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="bg-gradient-to-r from-[#4F46E5] to-[#9333EA] p-8 rounded-xl flex flex-col items-start gap-4 shadow-lg hover:shadow-indigo-700 transition-shadow transform hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg text-2xl"><MessageCircle /></div>
              <div>
                <h3 className="text-xl font-bold">Live Chat Support</h3>
                <p className="text-sm opacity-80">Available 24/7</p>
              </div>
            </div>
            <p className="text-sm">Need immediate assistance? Our support team is available round the clock to help you.</p>
            <button className="bg-[#1C1F26] px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors">Start Chat</button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#161B22] border border-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-600 transition-shadow">
              <div
                className="p-5 flex justify-between items-center cursor-pointer transition-all hover:bg-[#1C1F26]"
                onClick={() => toggleFaq(i)}
              >
                <span className="font-semibold">{faq.question}</span>
                <ChevronDown
                  className={`text-indigo-500 w-5 h-5 transition-transform duration-300 ${openFaqIndex === i ? "rotate-180" : ""}`}
                />
              </div>
              {openFaqIndex === i && (
                <p className="p-5 pt-0 text-gray-400 text-sm transition-all">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
