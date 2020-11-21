import React, { Component } from 'react';
import ImageItem from './ImageItem';
import UserInsta from './UserInsta';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            imgUrl: "",
        }
    }

    async componentDidMount() {
        const url = "https://dacnhk1.herokuapp.com/download/instagram";
        const option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "url": "https://www.instagram.com/emmawatson/"
            })
        };
        
        const response = await fetch(url, option);
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

        this.setState({ loading: false, imagesData: imagesData, videosData: videosData, userInsta: userInsta });
        console.log(this.state.imgUrl);
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
                        <div className="btn photo-btn col-sm">
                            <span>IMAGE TAP</span>
                        </div>
                        <div className="btn  video-btn col-sm">
                            <span>VIDEO TAP</span>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: '40px', width: '100%' }}>
                        <div className="col-lg-8 col-md-8 col-sm-12 image-video-container ">
                            {
                                this.state.loading ? (
                                    <ImageItem itemSrc="https://img.idesign.vn/2018/10/23/id-loading-1.gif"></ImageItem>) : (
                                    this.state.imagesData.map((img, idx) => <ImageItem itemSrc={img.url} key={idx} />)
                                )
                            }
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 info-container offset-1" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
                            {
                                this.state.loading ? (<UserInsta
                                        avatar="https://img.idesign.vn/2018/10/23/id-loading-1.gif"
                                        username="Loading"
                                        fullname="Loading"
                                        countPost="Loading"
                                        countFollowedBy= "Loading"
                                    />) : (
                                    <UserInsta
                                        avatar={this.state.userInsta.avatar}
                                        username={this.state.userInsta.username}
                                        fullname={this.state.userInsta.fullname}
                                        countPost={this.state.userInsta.countPost}
                                        countFollowedBy={this.state.userInsta.countFollowedBy}
                                    />
                                )
                            }
                            <button style={{ marginTop: '50px', textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }} type="button" className="btn btn-danger">sign in to download</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Gallery;
