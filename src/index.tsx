import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './index.css';
import service from './services/get-launches-past'


service({ limit: 10, offset: 1 }).then(console.log)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
