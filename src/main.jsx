import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/design-system.css';
import AlertProvider from './components/AlertProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </React.StrictMode>
);
