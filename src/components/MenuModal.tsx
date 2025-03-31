import React from 'react';
import { X } from 'lucide-react';
import { MenuItem } from '../types/menu';
import { useCartStore } from '../store/useCartStore';

interface MenuModalProps {
  item: MenuItem;
  onClose: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({ item, onClose }) => {
  const [quantity, setQuantity] = React.useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(item, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
          <p className="mt-2 text-gray-600">{item.description}</p>
          
          {item.ingredients && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">Ingredientes:</h3>
              <ul className="mt-2 space-y-1">
                {item.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-600">• {ingredient}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
              >
                +
              </button>
            </div>
            <span className="text-2xl font-bold text-orange-500">
              R$ {(item.price * quantity).toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};