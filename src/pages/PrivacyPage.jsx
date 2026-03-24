import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-[#0b1220] text-gray-300 pt-32 pb-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto bg-[#141a26] p-10 lg:p-14 rounded-3xl border border-gray-800 shadow-2xl">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8 border-b border-gray-700 pb-6">Privacy Policy</h1>
        
        <div className="space-y-8 text-lg">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This may include your name, email address, shipping address, payment information, and phone number.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to process your orders, communicate with you about your purchases, provide customer support, and personalize your shopping experience.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information with third-party service providers (like payment processors and shipping companies) strictly for the purpose of fulfilling your orders.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no absolute security is guaranteed over the internet.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Your Choices</h2>
            <p>You can review and update your account information at any time by logging into your profile. You may also opt out of receiving promotional emails from us by following the instructions in those emails.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
