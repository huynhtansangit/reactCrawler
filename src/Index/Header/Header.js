import React, { Component } from 'react';
import CustomizedMenu from './CustomizedMenu';
import SignInUp from './SignInUp';


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputUrlElement: '',
            nameSocialNetwork: ''
        }

        this.updateInputUrlElement = this.updateInputUrlElement.bind(this);
        this.selectSocialNetwork = this.selectSocialNetwork.bind(this);
    }

    selectSocialNetwork = (event) => {
        // console.log(`update name social network: ${event.target.getAttribute('id')}`);
        this.setState({ nameSocialNetwork: event.target.getAttribute('id') })
    }

    updateInputUrlElement = (event) => {
        // console.log(`update url ${event.target.value}`);
        this.setState({ inputUrlElement: event.target.value })
    }

    updateBannerInput = () => {
        // console.log("update btn header");
        this.props.onUpdateBannerInput(this.state.inputUrlElement, this.state.nameSocialNetwork)
    }

    handleHitEnter = (e) => {
        if (e.key === 'Enter') {
            // console.log("entered");
            this.updateBannerInput();
        }
    }

    componentDidMount() {
        (function () {

            var doc = document.documentElement;
            var w = window;

            var prevScroll = w.scrollY || doc.scrollTop;
            var curScroll;
            var direction = 0;
            var prevDirection = 0;

            var header = document.getElementById('navbar');

            var checkScroll = function () {

                /*
                ** Find the direction of scroll
                ** 0 - initial, 1 - up, 2 - down
                */

                curScroll = w.scrollY || doc.scrollTop;
                if (curScroll > prevScroll) {
                    //scrolled up
                    direction = 2;
                }
                else if (curScroll < prevScroll) {
                    //scrolled down
                    direction = 1;
                }

                if (direction !== prevDirection) {
                    toggleHeader(direction, curScroll);
                }

                prevScroll = curScroll;
            };

            var toggleHeader = function (direction, curScroll) {
                if (direction === 2 && curScroll > 52) {

                    //replace 52 with the height of your header in px

                    header.classList.add('hide-customized');
                    prevDirection = direction;
                }
                else if (direction === 1) {
                    header.classList.remove('hide-customized');
                    prevDirection = direction;
                }
            };

            window.addEventListener('scroll', checkScroll);

        })();
    }
    render() {
        const renderUserInfo = () => {
            if (this.props.isAuth) {
                return (
                    <div className="dropdown-menu-container">
                        <CustomizedMenu
                            fullname={this.props.fullname}
                            history={this.props.history}
                        />
                    </div>
                )
            }
            else {
                return (
                    <>
                        <SignInUp />
                    </>
                )
            }
        }

        return (
            <header>
                <nav id="navbar" className={`navbar navbar-expand-md navbar-light bg-light ${this.props.sticky}`}>
                    <div className="container">
                        <button className="navbar-toggler" data-toggle="collapse" data-target="#collapse_target" aria-expanded="false" aria-controls="collapse-target">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <a href="index.html" className="navbar-brand"><img src="Assets/Images/Banner/logo_transparent.png" alt="logo" width="120px" height="120px" /></a>
                        <div className="display-block w-100 align-self-center">
                            <div className="collapse navbar-collapse border-bottom border-dark w-100 box-shadow " id="collapse_target">
                                <div className="clearfix w-100">
                                    <div className="float-left">
                                        <ul className="navbar-nav">
                                            {/* eslint-disable */}
                                            <li className="parent-home nav-item dropdown">
                                                <a role="button" className="nav-link active" data-toggle="dropdown" data-target="#home_dropdown">Home
                                                    <span className="caret" />
                                                </a>
                                            </li>
                                            <li className="parent-page nav-item dropdown">
                                                {renderUserInfo()}
                                            </li>
                                            {/* eslint-disable */}
                                        </ul>
                                    </div>
                                    <div title="Today is open" className="float-right pb-2" style={{ marginTop: '8px' }}>
                                        <div className="dropdown dropdown-header-customize d-block-web">
                                            <button className="btn dropdown-toggle btn-select-social-network" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Choose...
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                {/* eslint-disable */}
                                                <a id="instagram" className="dropdown-item" onClick={this.selectSocialNetwork}>Instagram tool</a>
                                                <a id="tiktok" className="dropdown-item" onClick={this.selectSocialNetwork}>Tiktok tool</a>
                                                <a id="facebook" className="dropdown-item" onClick={this.selectSocialNetwork}>Facebook tool</a>
                                                {/* eslint-disable-line */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="float-right ">
                                <div className="dropdown dropdown-header-customize d-block-mobile">
                                    <button className="btn dropdown-toggle btn-select-social-network" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Choose...
                                            </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {/* eslint-disable */}
                                        <a id="instagram" className="dropdown-item" onClick={this.selectSocialNetwork}>Instagram tool</a>
                                        <a id="tiktok" className="dropdown-item" onClick={this.selectSocialNetwork}>Tiktok tool</a>
                                        <a id="facebook" className="dropdown-item" onClick={this.selectSocialNetwork}>Facebook tool</a>
                                        {/* eslint-disable-line */}
                                    </div>
                                </div>
                                <div className=" pt-2">
                                    <div className="form-group input-header-container navbar-nav">
                                        <img className="icon-input-header" src="Assets/Images/Banner/urlIcon1x.png" alt="" />
                                        <input style={{ paddingLeft: '55px' }} type="text" className="form-control input-header" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Url"
                                            onChange={this.updateInputUrlElement} onKeyDown={this.handleHitEnter} />
                                        <button type="button" className="btn btn-dark btn-input-header" onClick={this.updateBannerInput.bind(this)}><i className="fas fa-sign-in-alt" /></button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
