import React, { Component } from 'react';

class Banner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputUrlElement: '',
            nameSocialNetwork: ''
        }

        this.updateInputUrlElement = this.updateInputUrlElement.bind(this);
        this.selectSocialNetwork = this.selectSocialNetwork.bind(this);
    }

    selectSocialNetwork = (event)=>{
        console.log(`update name social network: ${event.target.getAttribute('id')}`);
        this.setState({ nameSocialNetwork: event.target.getAttribute('id') })
    }

    updateInputUrlElement = (event) => {
        console.log(`update url ${event.target.value}`);
        this.setState({ inputUrlElement: event.target.value })
    }

    updateBannerInput () {
        console.log("update btn");
        this.props.onUpdateBannerInput(this.state.inputUrlElement ,this.state.nameSocialNetwork)
    }

    render() {
        return (
            <section id="banner-section">
                <div className="logo-app">
                </div>
                <div className=" banner">
                    <img className="img-decor-banner" src="/Assets/Images/Banner/girl-cover-img.png" alt="" />
                    <div className="pink-circle-decor" id="circle-2">
                    </div>
                    <div className="pink-circle-decor" id="circle-3">
                    </div>
                    <div className="pink-circle-decor" id="circle-4">
                    </div>
                    <div className="pink-circle-decor" id="circle-5">
                    </div>
                    <div className="pink-circle-decor" id="circle-6">
                    </div>
                    <div className="pink-circle-decor" id="circle-7">
                    </div>
                    <div className="girl-circle-decor" id="girl-1">
                    </div>
                    <div className="girl-circle-decor" id="girl-2">
                    </div>
                    <div className="girl-circle-decor" id="girl-3">
                    </div>
                    <div className="girl-circle-decor" id="girl-4">
                    </div>
                    <div className="girl-circle-decor" id="girl-5">
                    </div>
                    <div className="girl-circle-decor" id="girl-6">
                    </div>
                </div>
                <button type="button" className=" btn btn-outline-dark">Sign-in <i className="fas fa-key" /></button>
                <button type="button" className=" btn btn-outline-danger">Sign-up<i style={{ marginLeft: '10px' }} className="fas fa-chevron-right" /></button>
                <div className="pink-circle-decor" id="circle-1">
                </div>
                <div className="big-slogan">
                    A place to save <br />
                    pictures, videos <br />
                    and moments.
                </div>
                <div className="small-slogan">
                    The social media era is well and truly underway <br />
                Photo &amp; Video sharing app Instagram, Facebook, Tiktok <br />
                have become a huge hit with younger audiences. <br />
                But if you find it hart to save them let's get started with us!
                </div>
                <div className="dropdown dropdown-banner">
                    <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Choose...
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a id="instagram" className="dropdown-item" href="#" onClick={this.selectSocialNetwork}>Instagram tool</a>
                        <a id="tiktok" className="dropdown-item" href="#" onClick={this.selectSocialNetwork}>Tiktok tool</a>
                        <a id="facebook" className="dropdown-item" href="#" onClick={this.selectSocialNetwork}>Facebook tool</a>
                    </div>
                </div>
                <div id="form-banner">
                    <div className="form-group input-url-container">
                        <img className="icon-input-url" src="Assets/Images/Banner/urlIcon1x.png" alt="" />
                        <input style={{ paddingLeft: '55px ' }} type="text" className="form-control input-url-element" id="input-url-banner" aria-describedby="emailHelp" placeholder="Url" onChange={this.updateInputUrlElement} />
                    </div>
                    <button className="submit-btn btn btn-danger" onClick={this.updateBannerInput.bind(this)}>Submit <img className="icon-search" src="/Assets/Images/Banner/btnIconSearch.png" alt="icon-search" /></button>
                </div>
            </section>
        );
    }
}

export default Banner;
