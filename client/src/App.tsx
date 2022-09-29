import React,{lazy,Suspense} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { RecordOfPages } from './utils/shared';

const SharedLayout =lazy(()=> import('./pages/sharedLayout/SharedLayout'));
const Dashboard =lazy(()=> import('./pages/dashboard'));
const Trucks =lazy(()=> import('./pages/trucks'));
const LoadAnalysis =lazy(()=> import('./pages/loadFactor'));
const Order =lazy(()=> import('./pages/order'));
const RouteComponent =lazy(()=> import('./pages/route/Route'));



export default function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>

      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path={RecordOfPages.Trucks} element={<Trucks />} />
          <Route path={RecordOfPages.Routes} element={<RouteComponent />} />
          <Route path={RecordOfPages.Order} element={<Order />} />
          <Route path={RecordOfPages.Analyzer} element={<LoadAnalysis />} />
        </Route>
      </Routes>
    </Suspense>
    </BrowserRouter>
  );
}
