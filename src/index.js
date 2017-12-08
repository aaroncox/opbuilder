import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
ReactDOM.render((
  <BrowserRouter basename='/sign/tx'>
    <App/>
  </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
