import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import RegistrationPage from './RegistrationPage';
import WorkoutPage from './WorkoutPage';
import AccountPage from './AccountPage';
import ProfilePage from './ProfilePage';
import darkTheme from '../styles/DarkTheme';
import lightTheme from '../styles/LightTheme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage setDarkMode={setDarkMode} />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/home" element={<HomePage setDarkMode={setDarkMode}/>} />
          <Route path="/create" element={<WorkoutPage />} />
          <Route path='/account' element={<AccountPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path='/profile' element={<ProfilePage setDarkMode={setDarkMode}/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
