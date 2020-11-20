import React, { Component } from 'react';
import ImageItem from './ImageItem';

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
                "url": "https://www.instagram.com/p/CGu-aKTDUNoBjIwqNli4wumHSi2VzXVnEvMFw80/"
            })
        };
        const response = await fetch(url, option);
        const data = await response.json();
        const urlImg = data.data[0].url;
        this.setState({ imgUrl: urlImg, loading: false });
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
                            {this.state.loading || !this.state.imgUrl ? (
                                <ImageItem itemSrc=""></ImageItem>
                            ) : (<ImageItem itemSrc={this.state.imgUrl}></ImageItem>
                                )}
                            {this.state.loading || !this.state.imgUrl ? (
                                <ImageItem itemSrc=""></ImageItem>
                            ) : (<ImageItem itemSrc={this.state.imgUrl}></ImageItem>
                                )}
                            {this.state.loading || !this.state.imgUrl ? (
                                <ImageItem itemSrc=""></ImageItem>
                            ) : (<ImageItem itemSrc={this.state.imgUrl}></ImageItem>
                                )}
                            {this.state.loading || !this.state.imgUrl ? (
                                <ImageItem itemSrc=""></ImageItem>
                            ) : (<ImageItem itemSrc={this.state.imgUrl}></ImageItem>
                                )}
                            {this.state.loading || !this.state.imgUrl ? (
                                <ImageItem itemSrc=""></ImageItem>
                            ) : (<ImageItem itemSrc={this.state.imgUrl}></ImageItem>
                                )}
                            {this.state.loading || !this.state.imgUrl ? (
                                <ImageItem itemSrc=""></ImageItem>
                            ) : (<ImageItem itemSrc={this.state.imgUrl}></ImageItem>
                                )}
                            {this.state.loading || !this.state.imgUrl ? (
                                <ImageItem itemSrc=""></ImageItem>
                            ) : (<ImageItem itemSrc={this.state.imgUrl}></ImageItem>
                                )}

                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 info-container offset-1" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
                            <div className="avt-container">
                                <img width={160} height={160} src="Assets/Images/Gallery/avtImg.png" alt="avatar-image" />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                                <i style={{ paddingRight: '15px' }} className="fab fa-instagram" />hunghung.cule.567</div>
                            <p style={{ fontSize: '26px', paddingTop: '49px', fontWeight: 'bold' }}>Available items</p>
                            <div className="number-of-images-available" style={{ fontWeight: 'bold', paddingTop: '43px', color: '#154B61', fontSize: '35px' }}>
                                432
              </div>
                            <button style={{ marginTop: '50px', textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }} type="button" className="btn btn-danger">sign in to download</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Gallery;
