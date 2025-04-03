import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, Send } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const CartPage = () => {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    deliveryType: 'delivery',
    address: '',
    paymentMethod: 'pix'
  });

  const formatWhatsAppMessage = () => {
    const itemsList = items
      .map(item => `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const deliveryInfo = deliveryDetails.deliveryType === 'delivery' 
      ? `\nEndereço de entrega: ${deliveryDetails.address}`
      : '\nRetirada no local';

    const message = 
`Olá! Gostaria de fazer o seguinte pedido:

*Nome do cliente:* ${deliveryDetails.name}

*Itens do pedido:*
${itemsList}

*Total do pedido:* R$ ${total().toFixed(2)}
*Forma de pagamento:* ${getPaymentMethodText(deliveryDetails.paymentMethod)}
*Tipo de pedido:* ${deliveryDetails.deliveryType === 'delivery' ? 'Entrega' : 'Retirada'}${deliveryInfo}

Aguardo a confirmação do pedido. Obrigado!`;

    return encodeURIComponent(message);
  };

  const getPaymentMethodText = (method) => {
    const methods = {
      pix: 'PIX',
      credit: 'Cartão de Crédito',
      debit: 'Cartão de Débito',
      cash: 'Dinheiro'
    };
    return methods[method];
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-8">Adicione alguns itens deliciosos ao seu carrinho!</p>
          <Link
            to="/menu"
            className="inline-flex items-center text-orange-500 hover:text-orange-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Cardápio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center py-4 border-b last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              
              <div className="flex-1 ml-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm">
                  R$ {item.price.toFixed(2)} cada
                </p>
                
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="mx-3">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="text-right ml-4">
                <p className="font-semibold">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600 mt-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>R$ {total().toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Detalhes do Pedido</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                value={deliveryDetails.name}
                onChange={(e) => setDeliveryDetails({...deliveryDetails, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Pedido
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="delivery"
                    checked={deliveryDetails.deliveryType === 'delivery'}
                    onChange={(e) => setDeliveryDetails({...deliveryDetails, deliveryType: e.target.value})}
                    className="mr-2"
                  />
                  Entrega
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="pickup"
                    checked={deliveryDetails.deliveryType === 'pickup'}
                    onChange={(e) => setDeliveryDetails({...deliveryDetails, deliveryType: e.target.value})}
                    className="mr-2"
                  />
                  Retirar no Local
                </label>
              </div>
            </div>

            {deliveryDetails.deliveryType === 'delivery' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço de Entrega
                </label>
                <textarea
                  value={deliveryDetails.address}
                  onChange={(e) => setDeliveryDetails({...deliveryDetails, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  placeholder="Rua, número, bairro, complemento"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Forma de Pagamento
              </label>
              <select
                value={deliveryDetails.paymentMethod}
                onChange={(e) => setDeliveryDetails({...deliveryDetails, paymentMethod: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="pix">PIX</option>
                <option value="credit">Cartão de Crédito</option>
                <option value="debit">Cartão de Débito</option>
                <option value="cash">Dinheiro</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Link
            to="/menu"
            className="inline-flex items-center text-orange-500 hover:text-orange-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continuar Comprando
          </Link>
          
          <a
            href={`https://wa.me/5569993646288?text=${formatWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-6 py-3 rounded-md inline-flex items-center hover:bg-green-600 transition-colors"
          >
            <Send className="w-4 h-4 mr-2" />
            Finalizar Pedido
          </a>
        </div>
      </div>
    </div>
  );
};
