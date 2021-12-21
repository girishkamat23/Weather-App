import React from 'react';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import WeatherComponent from './components/WeatherComponent';
import './App.css';
import { Routes, BrowserRouter, NavLink, Route } from 'react-router-dom';

function App() {
  return (
    <div id="App" className="App">
      <BrowserRouter>
        <header>
          <ul className="header-list" id="header-list">
            <NavLink to="/" id="home">
              Home
            </NavLink>
            <NavLink to="/aboutus" id="aboutus">
              About Us
            </NavLink>
            <NavLink to="/weather" id="weather">
              Weather
            </NavLink>
          </ul>
        </header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/aboutus" element={<AboutUs />}></Route>
          <Route path="/weather" element={<WeatherComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
