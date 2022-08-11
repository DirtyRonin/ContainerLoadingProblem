import React,{lazy,Suspense} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { RecordOfPages } from './utils/shared';

const SharedLayout =lazy(()=> import('./pages/sharedLayout/SharedLayout'));
const Dashboard =lazy(()=> import('./pages/dashboard'));
const Trucks =lazy(()=> import('./pages/trucks'));
const Goods =lazy(()=> import('./pages/goods'));
const LoadAnalysis =lazy(()=> import('./pages/loadFactor'));
const Order =lazy(()=> import('./pages/order'));



export default function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>

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
    </Suspense>
    </BrowserRouter>
  );
}
