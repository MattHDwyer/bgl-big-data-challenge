import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ProductPage } from './modules/products/pages';
import { OrderPage } from './modules/orders/pages';

function App() {
  return (
    <div className="App">
      <Routes>
         <Route path="/products" element={<ProductPage />} />
         <Route path="/orders" element={<OrderPage />} />
      </Routes>
    </div>
  );
}

export default App;
