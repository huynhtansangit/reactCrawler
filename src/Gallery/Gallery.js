import React, { Component } from 'react';

class Gallery extends Component {
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
                    <div className="row" style={{ marginTop: '40px !important', width: '100%' }}>
                        <div className="col-lg-8 col-md-8 col-sm-12 image-video-container ">
                            <div className="img-card">
                                <img src="Assets/Images/Gallery/1.png" alt="" />
                                <div className="card__text">
                                    <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                    <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                </div>
                            </div>
                            <div className="img-card">
                                <img src="Assets/Images/Gallery/2.png" alt="" />
                                <div className="card__text">
                                    <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                    <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                </div>
                            </div>
                            <div className="img-card">
                                <img src="Assets/Images/Gallery/3.png" alt="" />
                                <div className="card__text">
                                    <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                    <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                </div>
                            </div>
                            <div className="img-card">
                                <img src="Assets/Images/Gallery/4.png" alt="" />
                                <div className="card__text">
                                    <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                    <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                </div>
                            </div>
                            <div className="img-card">
                                <img src="Assets/Images/Gallery/5.png" alt="" />
                                <div className="card__text">
                                    <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                    <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                </div>
                            </div>
                            <div className="img-card">
                                <img src="Assets/Images/Gallery/6.png" alt="" />
                                <div className="card__text">
                                    <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                    <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                </div>
                            </div>
                            <div className="img-card">
                                <img src="Assets/Images/Gallery/7.png" alt="" />
                                <div className="card__text">
                                    <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                    <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                </div>
                            </div>
                            <div className="img-card">
                                <img src="Assets/Images/Gallery/8.png" alt="" />
                                <div className="card__text">
                                    <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                    <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                </div>
                            </div>
                            <div className="img-card">
                                <img src="Assets/Images/Gallery/9.png" alt="" />
                                <div className="card__text">
                                    <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                    <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                </div>
                            </div>
                            <div className="img-card">
                                <img src="Assets/Images/Gallery/10.png" alt="" />
                                <div className="card__text">
                                    <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                    <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                </div>
                            </div>
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
