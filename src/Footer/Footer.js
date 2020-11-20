import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footer-container">
                    <div className="customized-row-footer">
                        <div className="col-3 column-footer">
                            <img id="footer-logo" src="/Assets/Images/Footer/logo_transparent.png" alt="Logo" />
                            <p className="parent-menu" style={{ marginTop: 0 }}>Follow us</p>
                            <div className="row" style={{ objectFit: 'cover' }}>
                                <div className="col contact-icon"><a href="#"><img src="/Assets/Images/Footer/Path 4.png" alt="fb" /></a> </div>
                                <div className="col contact-icon"><a href="#"><img src="/Assets/Images/Footer/Group 1.png" alt="instagram" /></a></div>
                                <div className="col contact-icon"><a href="#"><img src="/Assets/Images/Footer/Layer 2.png" alt="twitter" /></a></div>
                            </div>
                        </div>
                        <div className="col-2">
                            <p className="parent-menu">Quick links</p>
                            <a className="child-menu" href="#">Image License</a> <br />
                            <a className="child-menu" href="#">Style Guide</a>
                        </div>
                        <div className="col-5">
                            <p className="parent-menu">Information</p>
                            <div className="row row-contain-icon-and-info">
                                <img className="col information-icon" src="/Assets/Images/Footer/Rectangle 24.png" alt="icon location" />
                                <p className="col align-self-center">ĐH CNTT-ĐHQG TP.HCM, KP6, phường Linh Trung, quận Thủ Đức</p>
                            </div>
                            <div className="row row-contain-icon-and-info">
                                <img className="col information-icon" src="/Assets/Images/Footer/Rectangle 25.png" alt="icon location" />
                                <p className="col align-self-center">0123456789</p>
                            </div>
                            <div className="row row-contain-icon-and-info">
                                <img className="col information-icon" src="/Assets/Images/Footer/Rectangle 26.png" alt="icon location" />
                                <a className="col align-self-center" href="mailto:1752xxxx@gm.uit.edu.vn" style={{ marginBottom: '1rem' }}>1752xxxx@gm.uit.edu.vn</a>
                            </div>
                        </div>
                        <div className="col-2">
                            <p className="parent-menu">Policies</p>
                            <a className="child-menu" href="#">Privacy Policies</a> <br />
                            <a className="child-menu" href="#">Refund Policies</a> <br />
                            <a className="child-menu" href="#">Term Of Services</a> <br />
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#F1CDCD', height: '0.1rem', margin: '2rem 6.2rem 2rem 6.2rem' }} />
                    <div style={{ display: 'inline' }}>
                        <p className="text-center" style={{ color: '#0A0A0A', paddingBottom: '1.5rem', marginBottom: '0px !important' }}> ©
              2020 Copyright: TanThaiHuy</p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
