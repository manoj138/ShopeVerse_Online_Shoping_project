import React from 'react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#0b1220] text-gray-300 pt-32 pb-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto bg-[#141a26] p-10 lg:p-14 rounded-3xl border border-gray-800 shadow-2xl">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8 border-b border-gray-700 pb-6">Terms of Service</h1>
        
        <div className="space-y-8 text-lg">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>Welcome to ShopVerse. By accessing this website and purchasing products from us, you agree to be bound by these Terms of Service. Please read them carefully.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. User Accounts</h2>
            <p>To use certain features of the site, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and password.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Products and Pricing</h2>
            <p>We strive to accurately describe our products and display correct pricing. However, we do not warrant that product descriptions or prices are error-free. We reserve the right to correct any errors and cancel orders if necessary.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Return Policy</h2>
            <p>Products can be returned within 14 days of receipt, provided they are in their original condition and packaging. Please check our detailed Return Policy page for more instructions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
            <p>ShopVerse shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use or inability to use the service.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
