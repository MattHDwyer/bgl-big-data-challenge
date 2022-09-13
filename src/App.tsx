import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { App as Dashboard } from './components';
import { ProductPage } from './modules/products/pages';
import { OrderPage } from './modules/orders/pages';
import { Link } from '@mui/material';
import { routes } from './routes';

function App() {
  return (
    <div className="App">
      <header className="header__container">
        <nav className="nav__container">
          <div className="nav__logo">BGL</div>
          <Link href="/" underline="hover" className="nav__link">
            Home
          </Link>
          <Link href="/products" underline="hover" className="nav__link">
            Products
          </Link>
          <Link href="/orders" underline="hover" className="nav__link">
            Orders
          </Link>
        </nav>
      </header>
      <div className="app__container">
        <Routes>
          {routes.map((route, i) => {
            return (
              <Route
                key={i}
                path={route.path}
                element={<route.component childRoutes={route.childRoutes} />}
              />
            );
          })}
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/products" element={<ProductPage />} />
          <Route path="/orders" element={<OrderPage />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
