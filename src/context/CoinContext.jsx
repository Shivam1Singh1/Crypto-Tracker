import React, { createContext, useEffect, useState } from 'react';
import './CoinContext.css';

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: 'usd',
    symbol: '$'
  });

  const fetchAllCoin = async () => {
    const options = {
      method: 'GET',
      headers: { 
        accept: 'application/json', 
        'x-cg-demo-api-key': 'CG-2gzdCD4s1YomSA65oHGc4K2D' 
      }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
      const data = await response.json();
      setAllCoin(data);
    } catch (error) {
      console.error('Error fetching coin data:', error);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin, 
    currency, 
    setCurrency
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
