// C:\Users\PranavShelake\Desktop\project\forntend\smart-cart\src\components\auth\AuthModal.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signupAsync,
  verifySignupAsync,
  loginAsync,
  sendOTPAsync,
  verifyOTPAsync,
  forgotPasswordAsync,
  resetPasswordAsync,
  clearError
} from '../../store/slices/authSlice';

const AuthModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error, pendingVerification, pendingOTPLogin, pendingPasswordReset } = useSelector((state) => state.auth);

  // View states: 'login', 'signup', 'verify-signup', 'otp-login', 'verify-otp', 'forgot-password', 'reset-password'
  const [view, setView] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    otp: '',
    resetToken: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Auto-switch views based on pending states
  useEffect(() => {
    if (pendingVerification) {
      setView('verify-signup');
      setFormData(prev => ({ ...prev, email: pendingVerification }));
    }
    if (pendingOTPLogin) {
      setView('verify-otp');
      setFormData(prev => ({ ...prev, email: pendingOTPLogin }));
    }
    if (pendingPasswordReset) {
      setView('reset-password');
      setFormData(prev => ({ ...prev, email: pendingPasswordReset }));
    }
  }, [pendingVerification, pendingOTPLogin, pendingPasswordReset]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    try {
      switch (view) {
        case 'signup':
          await dispatch(signupAsync({
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName
          })).unwrap();
          break;

        case 'verify-signup':
          await dispatch(verifySignupAsync({
            email: formData.email,
            otp: formData.otp
          })).unwrap();
          onClose();
          break;

        case 'login':
          await dispatch(loginAsync({
            email: formData.email,
            password: formData.password
          })).unwrap();
          onClose();
          break;

        case 'otp-login':
          await dispatch(sendOTPAsync(formData.email)).unwrap();
          break;

        case 'verify-otp':
          await dispatch(verifyOTPAsync({
            email: formData.email,
            otp: formData.otp
          })).unwrap();
          onClose();
          break;

        case 'forgot-password':
          await dispatch(forgotPasswordAsync(formData.email)).unwrap();
          break;

        case 'reset-password':
          if (formData.newPassword !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
          }
          await dispatch(resetPasswordAsync({
            email: formData.email,
            resetToken: formData.resetToken,
            newPassword: formData.newPassword
          })).unwrap();
          setView('login');
          break;

        default:
          break;
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      fullName: '',
      otp: '',
      resetToken: '',
      newPassword: '',
      confirmPassword: ''
    });
    dispatch(clearError());
  };

  const switchView = (newView) => {
    resetForm();
    setView(newView);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {view === 'login' && 'Welcome Back'}
              {view === 'signup' && 'Create Account'}
              {view === 'verify-signup' && 'Verify Email'}
              {view === 'otp-login' && 'Login with OTP'}
              {view === 'verify-otp' && 'Enter OTP'}
              {view === 'forgot-password' && 'Reset Password'}
              {view === 'reset-password' && 'New Password'}
            </h2>
            <p className="text-gray-600">
              {view === 'login' && 'Sign in to continue to SmartCart'}
              {view === 'signup' && 'Join SmartCart today'}
              {view === 'verify-signup' && 'Enter the code sent to your email'}
              {view === 'otp-login' && 'We\'ll send a code to your email'}
              {view === 'verify-otp' && 'Enter the code we sent you'}
              {view === 'forgot-password' && 'We\'ll send reset instructions'}
              {view === 'reset-password' && 'Enter your new password'}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Forms */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Login Form */}
            {view === 'login' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => switchView('otp-login')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Login with OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => switchView('forgot-password')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              </>
            )}

            {/* Signup Form */}
            {view === 'signup' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </>
            )}

            {/* Verify Signup */}
            {view === 'verify-signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-center text-2xl tracking-widest"
                  placeholder="000000"
                />
              </div>
            )}

            {/* OTP Login */}
            {view === 'otp-login' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            )}

            {/* Verify OTP */}
            {view === 'verify-otp' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">OTP Code</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-center text-2xl tracking-widest"
                  placeholder="000000"
                />
              </div>
            )}

            {/* Forgot Password */}
            {view === 'forgot-password' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            )}

            {/* Reset Password */}
            {view === 'reset-password' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reset Token</label>
                  <input
                    type="text"
                    name="resetToken"
                    value={formData.resetToken}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter reset token from email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  {view === 'login' && 'Sign In'}
                  {view === 'signup' && 'Create Account'}
                  {view === 'verify-signup' && 'Verify Email'}
                  {view === 'otp-login' && 'Send OTP'}
                  {view === 'verify-otp' && 'Verify OTP'}
                  {view === 'forgot-password' && 'Send Reset Link'}
                  {view === 'reset-password' && 'Reset Password'}
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm">
            {(view === 'login' || view === 'otp-login') && (
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => switchView('signup')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign up
                </button>
              </p>
            )}
            {view === 'signup' && (
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => switchView('login')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
            {(view === 'verify-signup' || view === 'verify-otp' || view === 'forgot-password' || view === 'reset-password') && (
              <button
                onClick={() => switchView('login')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;