//C:\Users\PranavShelake\Desktop\project\forntend\smart-cart\src\components\home\HeroSection.jsx
const HeroSection = ({ onGetStarted }) => {
  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                ✨ Welcome to SmartCart
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Shop Smarter,
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Live Better
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover amazing products at unbeatable prices. From electronics to fashion, we've got everything you need to elevate your lifestyle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                Explore Products
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <p className="text-3xl font-bold text-gray-900">50K+</p>
                <p className="text-gray-600 text-sm">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">100K+</p>
                <p className="text-gray-600 text-sm">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">4.9★</p>
                <p className="text-gray-600 text-sm">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  {/* Product Card 1 */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Premium Smartphone</p>
                      <p className="text-sm text-gray-600">Latest Model</p>
                    </div>
                    <p className="text-lg font-bold text-blue-600">$899</p>
                  </div>

                  {/* Product Card 2 */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">4K Monitor</p>
                      <p className="text-sm text-gray-600">Ultra HD</p>
                    </div>
                    <p className="text-lg font-bold text-purple-600">$599</p>
                  </div>

                  {/* Product Card 3 */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Webcam Pro</p>
                      <p className="text-sm text-gray-600">1080p HD</p>
                    </div>
                    <p className="text-lg font-bold text-pink-600">$199</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;