import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LocalSpots from './LocalSpots'
import TouristSpots from './TouristSpots'
import Home from './Home';
import HotelSpot from './HotelSpot';
import EaterySpot from './EaterySpot';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/local' element={<LocalSpots />} />
    <Route path='/tourist' element={<TouristSpots />} />
    <Route path='/hotel' element={<HotelSpot />} />
    <Route path='/eatery' element={<EaterySpot />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
