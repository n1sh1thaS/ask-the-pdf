import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
         <App />
    </ThemeProvider>
  </StrictMode>,
)
