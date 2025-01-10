import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: '#1976D2',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#64B5F6',
        contrastText: '#333333',
      },
      background: {
        default: '#333333',
        paper: '#424242',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#EEEEEE',
      },
      action: {
        hover: '#1565C0',
        selected: '#1976D2',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { color: '#FFFFFF' },
      body1: { color: '#FFFFFF' },
    },
  });

export default theme;