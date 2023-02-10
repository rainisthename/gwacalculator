import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
