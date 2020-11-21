import React, { Component } from 'react';

class Aboutus extends Component {
    render() {
        return (
            <section className="about-us-section">
                <div className="about-us-container">
                    <div className="row">
                        <div className="col-sm-12 col-md-7 col-lg-6 ">
                            <div className="row">
                                <div className="col-md-6 col-sm-6">
                                    <div className="info-member-item">
                                        <a href="https://www.facebook.com/thanhsonnguyen2022" className="nav-link">
                                            <img data-toggle="tooltip" data-placement="right" title="Contact through facebook" src="Assets/Images/Aboutus/avt-1.jpg" alt="avt-1" className="avt-member" />
                                            <p>nguyễn thanh sơn</p>
                                        </a>
                                        <p className="position">founder</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="info-member-item">
                                        <a href="https://www.facebook.com/maihung123" className="nav-link">
                                            <img data-toggle="tooltip" data-placement="right" title="Contact through facebook" src="Assets/Images/Aboutus/avt-2.jpg" alt="avt-1" className="avt-member" />
                                            <p>mai hùng</p>
                                        </a>
                                        <p className="position">co-founder</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="info-member-item">
                                        <a href="https://www.facebook.com/hunghoang59" className="nav-link">
                                            <img data-toggle="tooltip" data-placement="right" title="Contact through facebook" src="Assets/Images/Aboutus/avt-3.jpg" alt="avt-1" className="avt-member" />
                                            <p>hoàng ngọc hùng</p>
                                        </a>
                                        <p className="position">manager</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="info-member-item">
                                        <a href="https://www.facebook.com/dove.fonghoatuyetnguyet/" className="nav-link">
                                            <img data-toggle="tooltip" data-placement="right" title="Contact through facebook" src="Assets/Images/Aboutus/avt-4.jpg" alt="avt-1" className="avt-member" />
                                            <p>huỳnh tấn sang</p>
                                        </a>
                                        <p className="position">designer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="background-about-us col-sm-12 col-md-4 col-lg-5 offset-md-1">
                            <div className="about-us-text">
                                About our team
              </div>
                            <div className="intro-app-rectangle">
                                <div className="row">
                                    <div className=" border-right border-secondary col-6 text-content align-items-center flex-wrap">
                                        <p className="number">600+</p>
                                        <p className="text">List of all user <br /> accounts on my website</p>
                                    </div>
                                    <div className=" col-6 text-content align-items-center flex-wrap">
                                        <p className="number">6000+</p>
                                        <p className="text">List of all items <br /> have been downloaded</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Aboutus;
