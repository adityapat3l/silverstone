import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import CampingDashboard from './components/CampingDashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32', // Green shade
    },
    secondary: {
      main: '#f57c00', // Orange shade
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <CampingDashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;