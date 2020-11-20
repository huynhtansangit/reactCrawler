import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header>
                <nav id="navbar" className="navbar navbar-expand-md navbar-light bg-light fixed-top">
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
                                            <li className="parent-home nav-item dropdown">
                                                <a href="#" role="button" className="nav-link active" data-toggle="dropdown" data-target="#home_dropdown">Home
                          <span className="caret" />
                                                </a>
                                            </li>
                                            <li className="parent-page nav-item dropdown">
                                                <a className="nav-link " data-target="page-dropdown" href="#">About us<span className="caret" /></a>
                                            </li>
                                            <li className="parent-shop nav-item dropdown">
                                                <a className="nav-link " data-toggle="dropdown" data-target="shop-dropdown" href="#">Contact<span className="caret" /></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div title="Today is open" className="float-right pb-2" style={{ marginTop: '8px' }}>
                                        <div className="dropdown dropdown-header-customize">
                                            <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Choose...
                      </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#">Instagram tool</a>
                                                <a className="dropdown-item" href="#">Tiktok tool</a>
                                                <a className="dropdown-item" href="#">Facebook tool</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="float-right ">
                                <div className=" pt-2">
                                    <div className="form-group input-header-container navbar-nav">
                                        <img className="icon-input-header" src="Assets/Images/Banner/urlIcon1x.png" alt="" />
                                        <input style={{ paddingLeft: '55px !important' }} type="text" className="form-control input-header" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Url" />
                                        <button type="button" className="btn btn-dark btn-input-header"><i className="fas fa-sign-in-alt" /></button>
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
