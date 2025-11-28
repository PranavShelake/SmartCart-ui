//C:\Users\PranavShelake\Desktop\project\forntend\smart-cart\src\pages\Home.jsx
import HeroSection from "../components/home/HeroSection";
import { useNavigate } from "react-router-dom";
import Features from "../components/home/Features";
import ShopingHistory from "./ShopingHistory";
const Home = ({ onAuthClick }) => {

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <HeroSection onGetStarted={onAuthClick} />
      <Features />

      {/* Products Section */}
      <section id="products" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              Popular Products
            </span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight">
              Top
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text ml-1">
                Trending
              </span>{" "}
              Picks
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                <div className="relative h-56 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <svg
                    className="w-28 h-28 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                    />
                  </svg>
                  <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs rounded-lg font-semibold">
                    -20%
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">
                    Product {item}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Premium quality & features
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        ${99 + item * 50}
                      </span>
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ${129 + item * 50}
                      </span>
                    </div>

                    <button className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white transition hover:scale-110">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2m2.6 8h10l4-8H5.4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-lg transition duration-300">
              View All Products
            </button>
            <button
              className="ml-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-lg transition duration-300"
              onClick={() => navigate("/shopping-history")}
            >
              View Shopping History
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              About SmartCart
            </span>

            <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
              Your Modern
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text ml-2">
                Shopping Partner
              </span>
            </h2>

            <p className="text-gray-600 leading-relaxed text-lg">
              SmartCart offers seamless shopping backed by technology, quality,
              and trust.
            </p>

            <p className="text-gray-600 leading-relaxed text-lg">
              50,000+ verified products, fast delivery, secure payments & happy
              users globally.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-gray-700 font-medium">
              {["Verified Products", "Secure Payments", "24/7 Support"].map(
                (text) => (
                  <div key={text} className="flex items-center gap-2">
                    ✅ <span>{text}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 shadow-xl">
            <div className="bg-white rounded-2xl p-6 space-y-4">
              {[
                { label: "Best Prices", sub: "Guaranteed" },
                { label: "Fast Delivery", sub: "2–3 Days" },
                { label: "Secure Payment", sub: "SSL Encrypted" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"
                >
                  <div>
                    <div className="font-semibold text-gray-900">
                      {card.label}
                    </div>
                    <div className="text-sm text-gray-600">{card.sub}</div>
                  </div>
                  ✅
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
