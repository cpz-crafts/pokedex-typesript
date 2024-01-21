import React from 'react';
import MainPage from './components/MainPage';
import DetailsPage from './components/DetailsPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App(): any {
  return (
  
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:pokemonName" element={<DetailsPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
  
  </BrowserRouter>
  );
}

export default App;
