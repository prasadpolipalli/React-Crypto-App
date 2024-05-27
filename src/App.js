import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchCoins();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Crypto App</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
      />
      <div className="coin-list">
        {filteredCoins.map((coin) => (
          <div className="coin-item" key={coin.id}>
            <img src={coin.image} alt={coin.name} />
            <h2>{coin.name}</h2>
            <p>{coin.current_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
