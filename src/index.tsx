import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/admin.css';
import './styles/main.css';
import './styles/product.css';

function doRender() {
  ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
  );
  
}
window.onload = doRender;
module.hot.accept(doRender);
