import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage.jsx />} />
          <Route path="/menu" element={<MenuPage.jsx />} />
          <Route path="/cart" element={<CartPage.jsx />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;