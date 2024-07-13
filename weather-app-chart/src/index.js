import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {Toaster} from 'react-hot-toast'

const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab,serif",
    allVariants: { color: "white" },
  },
});

const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDF2rKGbY2nhUoe1rKcI3DhUKM_HZu2oUY&libraries=places`;
script.async = true;
script.defer = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position='top-right'/>
          <App />
        </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
