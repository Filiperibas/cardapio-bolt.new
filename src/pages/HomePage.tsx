import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Clock, Truck } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Sabor e Qualidade em Cada Prato
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Descubra nossa seleção de pratos preparados com ingredientes frescos e muito amor
            </p>
            <Link
              to="/menu"
              className="bg-orange-500 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Ver Cardápio
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <ChefHat className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Chef Especializado</h3>
              <p className="text-gray-600">
                Pratos preparados por chefs experientes com técnicas refinadas
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">
                Seu pedido entregue com rapidez e segurança
              </p>
            </div>
            <div className="text-center">
              <Truck className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Delivery Grátis</h3>
              <p className="text-gray-600">
                Entrega gratuita para pedidos acima de R$ 50,00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};