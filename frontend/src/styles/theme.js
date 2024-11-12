import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: '#8EB695',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#B3A394',
        contrastText: '#333333',
      },
      background: {
        default: '#F2F2F2',
        paper: '#E0E0E0',
      },
      text: {
        primary: '#333333',
        secondary: '#666666',
      },
      action: {
        hover: '#D0E2D4',
        selected: '#8EB695',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { color: '#333333' },
      body1: { color: '#666666' },
    },
  });

export default theme;