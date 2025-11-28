//C:\Users\PranavShelake\Desktop\project\forntend\smart-cart\src\App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ShoppingHistory from './pages/ShopingHistory';
import AuthModal from './components/auth/AuthModal';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar onAuthClick={() => setIsAuthModalOpen(true)} />
          
          <Routes>
            <Route 
              path="/" 
              element={<Home onAuthClick={() => setIsAuthModalOpen(true)} />} 
            />
            <Route 
              path="/shopping-history" 
              element={<ShoppingHistory />} 
            />
          </Routes>
          
          <Footer />
          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;