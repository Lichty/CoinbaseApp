import React, { useEffect, useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import Products from './components/Products';
import Search from './components/Search';

function App() {

  const CoinbasePro = require('coinbase-pro');
  const publicClient = new CoinbasePro.PublicClient();
  const [init, setInit] = useState(true);
  const [products, setProducts] = useState();
  const [currencies, setCurrencies] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    publicClient.getCurrencies((error, response, currencyBook) => {
      if (error) console.err(error);
      var currencyArr = [];
      var length = (currencyBook)?currencyBook.length:0;
      for(var i = 0; i < length; i++) {
        currencyArr[currencyBook[i].id] = currencyBook[i].name.toUpperCase();
      }
      setCurrencies(currencyArr);

      publicClient.getProducts((error, response, productBook) => {
        if (error) console.err(error);
        var productArr = [];
        var key;
        var length = (productBook)?productBook.length:0;
        for(var i = 0; i < length; i++) {
          productArr[i] = productBook[i];
          productArr[i]["search_key"] = productArr[i].base_currency+';'+
                                        productArr[i].quote_currency+';'+
                                        currencyArr[productArr[i].base_currency]+';'+
                                        currencyArr[productArr[i].quote_currency];
        }
        productArr.sort((a,b) => a.id-b.id)
        setProducts(productArr);
      })
    });
  },[]);

  return (
    <div className="App">
      <Search search={search} setSearch={val => setSearch(val)}/>
      {(products)?<Products products={products} search={search}/>:<p>Loading...</p>}
      {/* <Canvas width='400' height='400' publicClient={publicClient}/> */}
    </div>
  );
}

export default App;






