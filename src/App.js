import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './Components/MainPage';
import SearchDrugPage from './Components/SearchDrugPage';
import PharmacistOpinionPage from './Components/PharmacistOpinionPage';
import SignUpPage from './Components/SignUpPage';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchDrugPage />} />
        <Route path="/opinion" element={<PharmacistOpinionPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
