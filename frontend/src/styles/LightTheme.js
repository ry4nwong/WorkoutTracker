import { createTheme } from "@mui/material";

const lightTheme = createTheme({
    palette: {
      primary: {
        main: '#1976D2',
        contrastText: '#000000',
      },
      secondary: {
        main: '#64B5F6',
        contrastText: '#333333',
      },
      background: {
        default: '#FFFFFF',
        paper: '#F5F5F5',
      },
      text: {
        primary: '#333333',
        secondary: '#555555',
      },
      action: {
        hover: '#1565C0',
        selected: '#1976D2',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { color: '#333333' },
      body1: { color: '#333333' },
    },
  });
  
  export default lightTheme;