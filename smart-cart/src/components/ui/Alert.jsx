export const Alert = ({ type, message, onClose }) => (
  <div className={`p-4 rounded-lg flex items-start gap-3 ${
    type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
  }`}>
    <span className="text-xl">{type === 'error' ? '⚠️' : '✅'}</span>
    <div className="flex-1">
      <p className="text-sm font-medium">{message}</p>
    </div>
    {onClose && (
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        ✕
      </button>
    )}
  </div>
);