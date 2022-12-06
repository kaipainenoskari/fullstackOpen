import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';

axios.get('/api/persons').then(response => {
  ReactDOM.createRoot(document.getElementById('root')).render(<App />)
})