import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import Gallery from './Gallery/Gallery';
import Storage from './Storage/Storage';
import AboutUs from './AboutUs/AboutUs';
import Footer from './Footer/Footer';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Banner></Banner>
      <Gallery></Gallery>
      <Storage></Storage>
      <AboutUs></AboutUs>
      <Footer></Footer>
    </div>
  );
}
export default App;
