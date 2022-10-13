import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LogContextProvider } from './config/LogContext'

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <LogContextProvider>
  <BrowserRouter>

     <App />

  </BrowserRouter>,
  </LogContextProvider>
);

