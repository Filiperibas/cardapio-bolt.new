import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export const Header: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Menu className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Cardápio Virtual
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/menu" className="text-gray-700 hover:text-orange-500">
              Cardápio
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-500">
              Sobre
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-500">
              Contato
            </Link>
          </nav>

          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};