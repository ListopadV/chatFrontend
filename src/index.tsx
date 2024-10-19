import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./themeStyle";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {BrowserRouter as Router} from "react-router-dom";
import store, { persistor } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
        <ThemeProvider theme={theme}>
       <PersistGate persistor={persistor}>
           <Provider store={store}>
           <CssBaseline />
           <App />
       </Provider>
       </PersistGate>
    </ThemeProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
