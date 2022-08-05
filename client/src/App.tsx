import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SharedLayout from './pages/sharedLayout';
import Dashboard from './pages/dashboard';
import Trucks from './pages/trucks';
import Goods from './pages/goods';
import LoadAnalysis from './pages/loadFactor';
import Order from './pages/order';
import './App.css';
import { RecordOfPages } from './utils/shared';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path={RecordOfPages.Trucks} element={<Trucks />} />
          <Route path={RecordOfPages.Goods} element={<Goods />} />
          <Route path={RecordOfPages.Analyzer} element={<LoadAnalysis />} />
          <Route path={RecordOfPages.Order} element={<Order />} />

          {/* <Route path='*' element={<Error />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
