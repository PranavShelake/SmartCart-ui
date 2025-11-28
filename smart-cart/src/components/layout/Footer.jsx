//C:\Users\PranavShelake\Desktop\project\forntend\smart-cart\src\components\layout\Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-11 h-11 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">SmartCart</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop shop for smart shopping.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {["Home","Products","Features","About Us"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">→</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-2">
              {["FAQ","Shipping Info","Returns","Contact Us"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">→</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-3">
              Subscribe to get updates & offers
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-3 py-2 bg-gray-800 text-white text-sm rounded-l-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-r-lg hover:opacity-90 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 text-center">© 2025 SmartCart — All Rights Reserved.</p>

          <div className="flex gap-6">
            <a className="hover:text-blue-400 transition-colors">Facebook</a>
            <a className="hover:text-blue-400 transition-colors">Twitter</a>
            <a className="hover:text-pink-400 transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
