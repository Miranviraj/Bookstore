import React from 'react';

const OrderHistoryPage = () => {
  const orders = [
    {
      _id: '1',
      thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/81AYa7Tg6-L.jpg',
      title: '1984',
      authors: ['George Orwell'],
      price: 12.99,
      createdAt: '2024-04-15T10:30:00Z',
    },
    {
      _id: '2',
      thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/81l3rZK4lnL.jpg',
      title: 'Brave New World',
      authors: ['Aldous Huxley'],
      price: 9.99,
      createdAt: '2024-04-20T15:45:00Z',
    },
    {
      _id: '3',
      thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/71UwSHSZRnS.jpg',
      title: 'The Alchemist',
      authors: ['Paulo Coelho'],
      price: 11.49,
      createdAt: '2024-04-10T12:00:00Z',
    },
  ];

  return (
    <div className="p-6 text-white bg-zinc-900 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-400 mb-6">📦 Order History</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-zinc-800 p-4 rounded-lg shadow-md hover:shadow-orange-500/20 transition-shadow"
          >
          
            <h2 className="text-xl font-semibold mb-1">{order.title}</h2>
            <p className="text-sm text-gray-300 mb-1">Author: {order.authors.join(', ')}</p>
            <p className="text-sm text-gray-400 mb-1">
              Price: <span className="text-orange-400">${order.price}</span>
            </p>
            <p className="text-sm text-gray-500 mb-3">
              Purchased on:{' '}
              {new Date(order.createdAt).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full">
              Buy Again
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
