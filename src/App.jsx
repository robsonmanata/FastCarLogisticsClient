import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getProducts } from './actions/products';
import { getCategories } from './actions/categories';
import { getNotifications } from './actions/notifications';
import Login from './login/login';
import Dashboard from './dashboard/dashboard';
import Inventory from './inventory/inventory';
import Orders from './orders/orders';
import Categories from './categories/categories';
import Settings from './settings/settings';

import Transactions from './transactions/transactions';
import Notifications from './notifications/notifications';
import ItemsUsed from './reports/ItemsUsed';
import ItemsOrdered from './reports/ItemsOrdered';
import Finances from './finances/Finances';

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

    // Initial fetch
    dispatch(getNotifications(1));

    // Poll for notifications every 10 seconds
    const intervalId = setInterval(() => {
      dispatch(getNotifications(1));
    }, 10000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <BrowserRouter basename="/FastCarLogisticsClient">
      <AddProductModal />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/transactions" element={<Transactions />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/items-used" element={<ItemsUsed />} />
        <Route path="/items-ordered" element={<ItemsOrdered />} />
        <Route path="/finances" element={<Finances />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
