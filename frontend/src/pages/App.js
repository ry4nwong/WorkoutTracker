import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import RegistrationPage from './RegistrationPage';
import WorkoutPage from './WorkoutPage';
import AccountPage from './AccountPage';
import ProfilePage from './ProfilePage';
import theme from '../styles/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create" element={<WorkoutPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
