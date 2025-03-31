import React from 'react';
import { Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const MenuCard = ({ item, onItemClick }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addItem(item, 1);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => onItemClick(item)}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <span className="text-orange-500 font-bold">
            R$ {item.price.toFixed(2)}
          </span>
        </div>
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
          {item.description}
        </p>
        <button
          onClick={handleQuickAdd}
          className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};