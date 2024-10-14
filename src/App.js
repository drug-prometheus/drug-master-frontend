import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './Components/MainPage';
import SearchDrugPage from './Components/SearchDrugPage';
import PharmacistOpinionPage from './Components/PharmacistOpinionPage';
import SignUpPage from './Components/SignUpPage';
import LoginPage from './Components/LoginPage';
import OpinionPage from './Components/OpinionPage';
import DrugAnalysisPage from './Components/DrugAnalysisPage';
import IntroductionPage from './Components/IntroductionPage';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchDrugPage />} />
          <Route path="/opinion" element={<PharmacistOpinionPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/analysis" element={<DrugAnalysisPage /> } />
          <Route path="/opinionUser" element={<OpinionPage />} />
          <Route path="/introduction" element={<IntroductionPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
