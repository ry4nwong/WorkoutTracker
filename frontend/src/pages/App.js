import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import RegistrationPage from './RegistrationPage';
import WorkoutPage from './WorkoutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegistrationPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/create" element={<WorkoutPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
