// src/pages/ShoppingHistory.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoppingHistory, clearError } from '../store/slices/shoppingHistorySlice';

const ShoppingHistory = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.shoppingHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    dispatch(fetchShoppingHistory());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      processing: 'bg-blue-100 text-blue-800',
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.product_name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' || item.status?.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalSpent = filteredItems.reduce(
    (sum, item) => sum + (item.total_price || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 mt-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900">
                Shopping
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text ml-2">
                  History
                </span>
              </h1>
              <p className="mt-2 text-gray-600">
                Track and manage all your purchases
              </p>
            </div>
            <button
              onClick={() => dispatch(fetchShoppingHistory())}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform duration-200 font-semibold shadow-md"
            >
              🔄 Refresh
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Orders
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {filteredItems.length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Spent
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {formatCurrency(totalSpent)}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Items
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {filteredItems.reduce(
                      (sum, item) => sum + (item.quantity || 0),
                      0
                    )}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <input
                  type="text"
                  placeholder="Search by product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-600 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
              <p className="mt-4 text-gray-600 font-medium">
                Loading your shopping history...
              </p>
            </div>
          </div>
        )}

        {/* Shopping History Grid */}
        {!loading && filteredItems.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <svg
              className="w-20 h-20 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your filters'
                : 'Start shopping to see your history here'}
            </p>
          </div>
        )}

        {!loading && filteredItems.length > 0 && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 font-semibold text-gray-700 text-sm border-b border-gray-200">
              <div className="col-span-3">Product</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1 text-center">Qty</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-center">Payment</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-1 text-center">Date</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* Product Name */}
                  <div className="col-span-3 flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {item.product_name || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        ID: {item.id}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-2 flex items-center">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {item.category || 'General'}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1 flex items-center justify-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg font-semibold text-sm">
                      {item.quantity || 0}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 flex flex-col items-end justify-center">
                    <span className="font-bold text-gray-900">
                      {formatCurrency(item.total_price || 0)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatCurrency(item.price_per_unit || 0)} each
                    </span>
                  </div>

                  {/* Payment Method */}
                  <div className="col-span-2 flex items-center justify-center">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium">
                      {item.payment_method || 'N/A'}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-1 flex items-center justify-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status || 'N/A'}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="col-span-1 flex items-center justify-center">
                    <span className="text-sm text-gray-600">
                      {formatDate(item.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingHistory;