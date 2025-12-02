import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getProducts } from './actions/products';
import { getCategories } from './actions/categories';
import Login from './login/login';
import Dashboard from './dashboard/dashboard';
import Inventory from './inventory/inventory';
import Orders from './orders/orders';
import Categories from './categories/categories';
import Settings from './settings/settings';
import Warehouse from './warehouse/warehouse';

import './App.css';

import AddProductModal from './AddProductModal/AddProductModal';

import { jwtDecode } from 'jwt-decode';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('profile'));

    if (user?.token) {
      const decodedToken = jwtDecode(user.token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch({ type: 'LOGOUT' });
        window.location.href = '/login';
      }
    }

    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AddProductModal />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
