export const Input = ({ icon: Icon, type = "text", placeholder, value, onChange, maxLength }) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      <Icon size={20} />
    </div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder-gray-400"
    />
  </div>
);