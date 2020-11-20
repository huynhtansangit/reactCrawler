import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import Gallery from './Gallery/Gallery';
import Storage from './Storage/Storage';
import Aboutus from './Aboutus/Aboutus';
import Footer from './Footer/Footer';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Banner></Banner>
      <Gallery></Gallery>
      <Storage></Storage>
      <Aboutus></Aboutus>
      <Footer></Footer>
    </div>
  );
}
export default App;
