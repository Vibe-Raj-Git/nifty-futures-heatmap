
import React, { useEffect, useState } from 'react';

const getColor = (change) => {
  if (change > 1) return 'bg-green-500';
  if (change > 0) return 'bg-green-300';
  if (change < -1) return 'bg-red-500';
  if (change < 0) return 'bg-red-300';
  return 'bg-gray-200';
};

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:5000/api/nifty-futures');
      const json = await res.json();
      setData(json);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🔥 Nifty Futures Heatmap</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((stock) => (
          <div
            key={stock.symbol}
            className={`text-white p-4 rounded-xl shadow ${getColor(stock.changePercent)}`}
          >
            <div className="text-lg font-semibold">{stock.symbol}</div>
            <div className="text-sm">LTP: ₹{stock.ltp}</div>
            <div className="text-sm">
              Change: {stock.changePercent > 0 ? '+' : ''}
              {stock.changePercent?.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
