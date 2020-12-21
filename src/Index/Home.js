import React, { Component } from 'react';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import Gallery from './Gallery/Gallery';
import AboutUs from './Aboutus/Aboutus';
import Footer from './Footer/Footer';
import {DOWNLOAD_URL} from '../utils/config.url'
import auth from '../auth/auth'
import cookies from '../utils/cookie'


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputUrl: 'https://www.instagram.com/selenagomez/',
            nameNetwork: 'instagram',
            cursor: '',
            hasNextPage: true,
            clickedBtnSearch: false,
            dataGallery: {},
            disableLoadMoreBtn: false,
            fullname: "User",
            isAuth: false,
            additionalInfoTiktok: {isAdded: null, id: null, source: null, collectionId: null}
        }
    }

    async getMedia(inputUrl, nameNetwork, cursor){
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if(this.state.isAuth)
            headers['Authorization']=`bearer ${cookies.get('accessToken')}`;
        let option = {
            method: 'POST',
            headers: headers
        };
        
        try {
            let fetchUrl = "";
            if(nameNetwork === 'tiktok'){
                option['method']='GET';
                fetchUrl = `${DOWNLOAD_URL}/${nameNetwork}/info?url=${inputUrl}`
            }
            else{
                if(cursor){
                    option['body'] = JSON.stringify({
                        "url": inputUrl,
                        "cursor": cursor
                    })
                }
                else{
                    option['body'] = JSON.stringify({
                        "url": inputUrl,
                    })
                }
                fetchUrl = `${DOWNLOAD_URL}/${nameNetwork}`;
                // response = await fetch(`${DOWNLOAD_URL}/${nameNetwork}`, option);
            }
            const response = await fetch(fetchUrl, option);
            const data = await response.json();

            if(!data['data']?.length && !data['owner'])
                throw new Error("User or post not found!")

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
                if(nameNetwork==='tiktok'){
                    this.setState({additionalInfoTiktok: {
                        isAdded: data['isAdded'],
                        id: data['id'], 
                        source: data['source'],
                        collectionId: data['collectionId'],
                    }});
                    this.setState({isAddedTiktok: data['isAdded']});
                }
                videosData = data['data'];
            }
            
            await this.setState({
                dataGallery: {loading: false, imagesData: imagesData, videosData: videosData, ownerMedia: ownerMedia, error: null},
                nameNetwork: nameNetwork,
                inputUrl: inputUrl,
                cursor: data['cursor'] ? data['cursor'] : "",
                hasNextPage: data['hasNextPage'],
            });
        } catch (error) {
            console.log(error);
            await this.setState({
                dataGallery: {loading: false, error: error},
                nameNetwork: nameNetwork
            })
        }

        // No more image to load -> disable btn
        if(!this.state.hasNextPage){
            this.setState({disableLoadMoreBtn: true});
        }
        else{
            this.setState({disableLoadMoreBtn: false});
        }

        return this.state.dataGallery;
    }

    async getMoreMedia(){
        // Temporary disable until load finish
        await this.setState({disableLoadMoreBtn: true});
        
        let currentDataGallery = this.state.dataGallery;
        // Demo an array of object, will be replaced by response later 
        let nextDataGallery = await this.getMedia(this.state.inputUrl, this.state.nameNetwork, this.state.cursor)
        
        if(!nextDataGallery.error){
            const updatedImagesData = currentDataGallery.imagesData.concat(nextDataGallery.imagesData);
            currentDataGallery.imagesData = updatedImagesData;

            const updatedVideosData = currentDataGallery.videosData.concat(nextDataGallery.videosData);
            currentDataGallery.videosData = updatedVideosData;
        } 
        else{
            await this.setState({disableLoadMoreBtn: false})
        }
        
        this.setState({dataGallery: currentDataGallery});
    }

    onUpdateBannerInput (inputUrl, nameNetwork) { 
        // console.log("onUpdateBannerInput");
        this.setState({ 
            inputUrl: inputUrl,
            clickedBtnSearch: true
        })
        if(nameNetwork){
            this.setState({nameNetwork: nameNetwork});}
    }

    async componentDidMount(){
        // Authenticating process.
        const authProcess = await auth.verifyAccessToken();
        if(authProcess){
            await this.setState({isAuth: true});

            const firstName = await localStorage.getItem('firstname');
            const lastName = await localStorage.getItem('lastname');
            if(firstName && lastName)
                this.setState({fullname: `${firstName} ${lastName}`}); 
        }
        
        await this.getMedia(this.state.inputUrl, this.state.nameNetwork);
    }

    async componentDidUpdate(){
        if (this.state.clickedBtnSearch) {
            // console.log(`Searching because clickedBtnSearch is ${this.state.clickedBtnSearch}`);
            // Note: if getMedia before setState will search at least twice due to async of js
            await this.setState({clickedBtnSearch:false, dataGallery: {}, disableLoadMoreBtn: false});
            await this.getMedia(this.state.inputUrl, this.state.nameNetwork);
        } else {
            // console.log(`Not searching because clickedBtnSearch is ${this.state.clickedBtnSearch}`);
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
                    history={this.props.history}
                    fullname={this.state.fullname}
                    isAuth={this.state.isAuth}
                ></Banner>
                <Gallery 
                    dataGallery= {this.state.dataGallery}
                    additionalInfoTiktok= {this.state.additionalInfoTiktok}
                    nameNetwork= {this.state.nameNetwork}
                    inputUrl= {this.state.inputUrl}
                    getMoreMedia={this.getMoreMedia.bind(this)}
                    disableLoadMoreBtn={this.state.disableLoadMoreBtn}
                    history={this.props.history}
                    isAuth={this.state.isAuth}>
                </Gallery>
                {/* <Storage></Storage> */}
                <AboutUs></AboutUs>
                <Footer></Footer>
            </div>
        );
    }
}

export default Index;
