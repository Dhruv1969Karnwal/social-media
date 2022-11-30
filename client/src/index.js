import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import './styles/global.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import DataProvider from './redux/store'

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <DataProvider>
  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode> */}
  </DataProvider>
  </Router>
);


reportWebVitals();



// import React from 'react';
// import ReactDOM from 'react-dom';
// import * as ReactDOMClient from 'react-dom/client';
// import Switch from './components/Switch';

// const root = ReactDOMClient.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Switch />
//   </React.StrictMode>
// );