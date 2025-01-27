import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Error from './components/Error.js';

import ThemeProvider from "./utils/ThemeContext.js";
// import { VALID_CONNECTION } from "./utils/socket.js";
const VALID_CONNECTION = true;

// subscribe to socket to validate connection

const root = ReactDOM.createRoot(document.getElementById('root'));
VALID_CONNECTION ? 
root.render(
  <React.StrictMode>
  <ThemeProvider>
    <App />
  </ThemeProvider>
  </React.StrictMode>
) : 
root.render(
  <Error message={VALID_CONNECTION.message} />
);
