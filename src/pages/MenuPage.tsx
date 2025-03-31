import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { MenuItem } from '../types/menu';
import { MenuCard } from '../components/MenuCard';
import { MenuModal } from '../components/MenuModal';

const categories = [
  'Todos',
  'Entradas',
  'Pratos Principais',
  'Sobremesas',
  'Bebidas',
];

// Sample data - in a real app, this would come from an API
const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Picanha na Brasa',
    description: 'Suculenta picanha grelhada com temperos especiais',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Pratos Principais',
    ingredients: ['Picanha', 'Sal grosso', 'Alho', 'Azeite'],
    available: true,
  },
  // Add more menu items here
];

export const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar pratos ou ingredientes..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onItemClick={() => setSelectedItem(item)}
            />
          ))}
        </div>

        {/* Item Modal */}
        {selectedItem && (
          <MenuModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </div>
    </div>
  );
};