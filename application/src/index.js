import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';
import env from './constants/environment';
import App from './App';

import './index.css';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);

/* eslint-disable-next-line no-console */
!env.prod && reportWebVitals(console.log);
