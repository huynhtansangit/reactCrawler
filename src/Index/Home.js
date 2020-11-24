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
            const ownerMedia = data['owner'];

            if(nameNetwork === 'instagram'){
                data['data'].forEach(ele => {
                    if(ele['isVideo']){
                        videosData.push(ele);
                    }
                    else{
                        imagesData.push(ele);
                    }            
                });
            }
            else{
                videosData = data['data'];
            }
            
            this.setState({
                dataGallery: {loading: false, imagesData: imagesData, videosData: videosData, ownerMedia: ownerMedia, error: null },
                nameNetwork: nameNetwork
            });
        } catch (error) {
            console.log(error);
            this.setState({
                dataGallery: {loading: false, error: error},
                nameNetwork: nameNetwork
            })
        }
    }

    async getMoreMedia(){
        let newDataGallery = this.state.dataGallery;
        // Demo an array of object, will be replaced by response later 
        let tempArrObj = [{
            "shortcode": "CBHY1ZaJEx5",
            "url": "https://scontent-lht6-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/101851983_2598122903839670_5522408425266996950_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com&_nc_cat=1&_nc_ohc=nJynWahi_KUAX9X4-yt&tp=1&oh=06ae19a699da48ccc54c1974209a8ea3&oe=5FE5D413",
            "isVideo": false,
            "width": 1080,
            "height": 1080,
            "countComment": 24508,
            "countLike": 1073592
        },
        {
            "shortcode": "CBDB20spoxq",
            "url": "https://scontent-lht6-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/101717361_250895022906406_2163082289657108531_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com&_nc_cat=1&_nc_ohc=J3m_zRxusX4AX875RkB&tp=1&oh=b880a830d89fad50dc62cf3860385709&oe=5FE48BB8",
            "isVideo": false,
            "width": 1080,
            "height": 1080,
            "countComment": 1665,
            "countLike": 760570
        }];
        const updatedImagesData = newDataGallery.imagesData.concat(tempArrObj);
        newDataGallery.imagesData = updatedImagesData;

        // const updatedVideosData = newDataGallery.imagesData.concat(tempArrObj);
        // newDataGallery.videosData = updatedVideosData;

        this.setState({dataGallery: newDataGallery});
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
        if (this.state.clickedBtnSearch) {
            console.log(`Searching because clickedBtnSearch is ${this.state.clickedBtnSearch}`);
            // Note: if getMedia before setState will search at least twice due to async of js
            await this.setState({clickedBtnSearch:false, dataGallery: {}});
            await this.getMedia(this.state.inputUrlElement, this.state.nameSocialNetwork);
        } else {
            console.log(`Not searching because clickedBtnSearch is ${this.state.clickedBtnSearch}`);
        }
    }

    render() {
        return (
            <div>
                <Header
                    onUpdateBannerInput={this.onUpdateBannerInput.bind(this)} 
                    sticky="fixed-top"
                ></Header>
                <Banner 
                    onUpdateBannerInput={this.onUpdateBannerInput.bind(this)}
                ></Banner>
                <Gallery 
                    dataGallery= {this.state.dataGallery}
                    nameNetwork= {this.state.nameNetwork}
                    getMoreMedia={this.getMoreMedia.bind(this)}>
                </Gallery>
                <Storage></Storage>
                <AboutUs></AboutUs>
                <Footer></Footer>
            </div>
        );
    }
}

export default Index;
