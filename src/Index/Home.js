import React, { Component } from 'react';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import Gallery from './Gallery/Gallery';
import Storage from './Storage/Storage';
import AboutUs from './Aboutus/Aboutus';
import Footer from './Footer/Footer';

const DOWNLOAD_ENDPOINT = "https://dacnhk1.herokuapp.com/download/";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputUrlElement: 'https://www.instagram.com/kygomusic/',
            nameSocialNetwork: 'instagram',
            clickedBtnSearch: false,
            dataGallery: {}
        }
    }

    async getMedia(inputUrl, nameNetwork){
        const option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "url": inputUrl
            })
        };
        
        try {
            const response = await fetch(DOWNLOAD_ENDPOINT+nameNetwork, option);
            const data = await response.json();
            let imagesData = [];
            let videosData = [];
            const userInsta = data['owner'];

            data['data'].forEach(ele => {
                if(ele['isVideo']){
                    videosData.push(ele);
                }
                else{
                    imagesData.push(ele);
                }            
            });

            this.setState({dataGallery: {loading: false, imagesData: imagesData, videosData: videosData, userInsta: userInsta, error: '' }});
        } catch (error) {
            console.log(error);
            this.setState({dataGallery: {loading: false, error: error}})
        }
    }

    onUpdateBannerInput (inputUrlElement, nameSocialNetwork) { 
        console.log("onUpdateBannerInput");
        this.setState({ 
            inputUrlElement: inputUrlElement,
            nameSocialNetwork: nameSocialNetwork ,
            clickedBtnSearch: true
        }) 
    }

    async componentDidMount(){
        await this.getMedia(this.state.inputUrlElement, this.state.nameSocialNetwork);
    }

    async componentDidUpdate(){
        console.log("home did update");
        if (this.state.clickedBtnSearch) {
            console.log(`Searching because ${this.state.clickedBtnSearch}`);
            // Note: if getMedia before setState will search twice due to async of js
            this.setState({clickedBtnSearch:false});
            await this.getMedia(this.state.inputUrlElement, this.state.nameSocialNetwork);
        } else {
            console.log(`Not searching because ${this.state.clickedBtnSearch}`);
        }
    }

    render() {
        return (
            <div>
                <Header sticky="fixed-top"></Header>
                <Banner 
                    onUpdateBannerInput={this.onUpdateBannerInput.bind(this)}
                ></Banner>
                <Gallery 
                    dataGallery= {this.state.dataGallery}>
                </Gallery>
                <Storage></Storage>
                <AboutUs></AboutUs>
                <Footer></Footer>
            </div>
        );
    }
}

export default Index;
