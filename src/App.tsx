import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { App as Dashboard } from './components';
import { Link } from '@mui/material';
import { routes } from './routes';

function App() {
  return (
    <div className="App">
      <header className="header__container">
        <nav className="nav__container">
          <div className="nav__logo">ABHT Competitions</div>
          <Link href="/" underline="hover" className="nav__link">
            Home
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
