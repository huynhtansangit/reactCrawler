import React, { Component } from 'react';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import Gallery from './Gallery/Gallery';
import Storage from './Storage/Storage';
import AboutUs from './Aboutus/Aboutus';
import Footer from './Footer/Footer';
class Index extends Component {
    render() {
        return (
            <div>
                <Header sticky="fixed-top"></Header>
                <Banner></Banner>
                <Gallery></Gallery>
                <Storage></Storage>
                <AboutUs></AboutUs>
                <Footer></Footer>
            </div>
        );
    }
}

export default Index;
