import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SharedLayout from './pages/sharedLayout';
import Dashboard from './pages/dashboard';
import Trucks from './pages/trucks';
import Goods from './pages/goods';
import LoadAnalysis from './pages/loadFactor';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="trucks" element={<Trucks />} />
          <Route path="orders" element={<Goods />} />
          <Route path="analyzer" element={<LoadAnalysis />} />

          {/* <Route path='*' element={<Error />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
