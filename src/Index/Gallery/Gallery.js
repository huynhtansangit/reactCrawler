import React, { Component } from 'react';
import ImageItem from './ImageItem';
import UserInsta from './UserInsta';
import ReactPlayer from 'react-player'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const DOWNLOAD_ENDPOINT = "https://dacnhk1.herokuapp.com/download/";

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        
    }

    componentDidUpdate(){

    }

    render() {
        return (
            <section id="gallery-section">
                <div className="gallery-container text-center">
                    <div className="d-inline-block">
                        <div className="wonderful-gift-title text-left" style={{ fontFamily: 'Pristina', fontSize: '48px', letterSpacing: '4px' }}>Your Gallery</div>
                        <h2 className="text-left slogan-title text-uppercase" style={{ letterSpacing: '4px' }}>Let's enjoy yourself</h2>
                    </div>
                    <div className="row">
                        <div id="btn-image-gallery" className="btn photo-btn col-sm">
                            <span>IMAGE TAB</span>
                        </div>
                        <div id="btn-video-gallery" className="btn video-btn col-sm">
                            <span>VIDEO TAB</span>
                        </div>
                    </div>
                    <div id="image-tab-gallery" className="row gallery-tab">
                        <div className="col-lg-8 col-md-8 col-sm-12 image-video-container ">
                            {
                                Object.keys(this.props.dataGallery).length === 0 ? 
                                    // Check if data is null => Show loading
                                    (<img className="justify-item-center" src="https://img.idesign.vn/2018/10/23/id-loading-1.gif"/>) 
                                    : 
                                    // Else: loaded
                                    (
                                        !this.props.dataGallery.error ?
                                        // If not error => Show images 
                                        (this.props.dataGallery.imagesData.map((img, idx) => <ImageItem itemSrc={img.url} key={idx} />)) 
                                        : 
                                        // else: error occurred => Show pic 500
                                        (<img className="justify-item-center" src="https://bizflyportal.mediacdn.vn/bizflyportal/461/347/2020/06/02/22/54/nhi15910916872906.jpg"/>)
                                    )
                            }
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 info-container offset-1" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
                            {
                                // The same above.
                                Object.keys(this.props.dataGallery).length === 0 ? 
                                    (<UserInsta
                                        avatar="https://img.idesign.vn/2018/10/23/id-loading-1.gif"
                                        username="Loading"
                                        fullname="Loading"
                                        countPost="Loading"
                                        countFollowedBy= "Loading"
                                    />) : (
                                        !this.props.dataGallery.error ?
                                        (<UserInsta
                                            avatar={this.props.dataGallery.userInsta.avatar}
                                            username={this.props.dataGallery.userInsta.username}
                                            fullname={this.props.dataGallery.userInsta.fullname}
                                            countPost={this.props.dataGallery.userInsta.countPost}
                                            countFollowedBy={this.props.dataGallery.userInsta.countFollowedBy}
                                        />) : (
                                            <UserInsta
                                            avatar="https://bizflyportal.mediacdn.vn/bizflyportal/461/347/2020/06/02/22/54/nhi15910916872906.jpg"
                                            username="Error"
                                            fullname="Error"
                                            countPost="Error"
                                            countFollowedBy= "Error"
                                        />
                                        )
                                )
                            }
                            <button style={{ marginTop: '50px', textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }} type="button" className="btn btn-danger">sign in to download</button>
                        </div>
                    </div>
                    <div id="video-tab-gallery" className="row gallery-tab swiper-container">
                        <div className="swiper-wrapper">
                        {
                            Object.keys(this.props.dataGallery).length === 0 ? 
                                // Check if data is null => Show loading
                                (<img className="justify-item-center" src="https://img.idesign.vn/2018/10/23/id-loading-1.gif"/>) 
                                : 
                                // Else: loaded
                                (
                                    !this.props.dataGallery.error ?
                                    // If not error => Show images 
                                    (this.props.dataGallery.videosData.map((video, idx) => 
                                    <div className="swiper-slide">
                                        <ReactPlayer 
                                            url={video.url} key={idx} 
                                            controls={true}
                                            width={'100rem'}
                                            height={'100rem'}
                                        />
                                    </div>)) 
                                    : 
                                    // else: error occurred => Show pic 500
                                    (<img className="justify-item-center" src="https://bizflyportal.mediacdn.vn/bizflyportal/461/347/2020/06/02/22/54/nhi15910916872906.jpg"/>)
                                )
                        }
                        </div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div> 
                </div>
            </section>
        );
    }
}

export default Gallery;
