import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ShoppingHistory from './pages/ShopingHistory';
import AuthModal from './components/auth/AuthModal';
import MindEaseApp from './pages/MindEaseApp';

function AppContent() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();   // 👈 FIXED

  return (
    <div className="min-h-screen bg-white">
     {/* {location.pathname !== "/practice" &&  <Navbar onAuthClick={() => setIsAuthModalOpen(true)} />} */}

      <Routes>
        {/* <Route 
          path="/" 
          element={<Home onAuthClick={() => setIsAuthModalOpen(true)} />} 
        />
        <Route 
          path="/shopping-history" 
          element={<ShoppingHistory />} 
        /> */}
        <Route 
          path="/"           // 👈 FIXED (lowercase)
          element={<MindEaseApp />} 
        />
      </Routes>

      {/* Hide footer on /practice */}
      {/* {location.pathname !== "/practice" && <Footer />}  👈 FIXED */}

      {/* <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      /> */}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
