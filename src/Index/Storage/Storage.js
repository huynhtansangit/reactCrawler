import React, { Component } from 'react';

class Storage extends Component {
    render() {
        return (
            <section id="storage-section">
                <div className="storage-container">
                    <img id="you-can-find-downloaded-stuff-here" src="Assets/Images/Store/Mask-Group-2-Copy.png" alt="All downloaded here" />
                    <div className="row horizontal-wrapper-customized-btn">
                        <div className="profile-customized-btn customized-btn col">
                            <img className="icon-customized-btn" src="Assets/Images/Store/Rectangle -2.png" alt="profile" />
                            <p>Your profile</p>
                        </div>
                        <div className="picture-customized-btn customized-btn col selected-customized-btn">
                            <img className="icon-customized-btn" src="Assets/Images/Store/Rectangle 34.png" alt="Images" />
                            <p>Instag pictures <br /> of your own</p>
                        </div>
                        <div className="video-customized-btn customized-btn col">
                            <img className="icon-customized-btn" src="/Assets/Images/Store/Rectangle 33.png" alt="videos" />
                            <p>Instag videos <br /> of your own</p>
                        </div>
                    </div>
                    <div className="row wrapper-storage mx-auto">
                        <div className="col-xl-1 p-0 vertical-wrapper-customized-btn">
                            <img className="avatar-img mb-3 mr-2" src="Assets/Images/Store/anna-kendrick.jpg" alt="avatar" />
                            <p style={{ borderTop: '#154B61 0.2rem solid', paddingTop: '0.5rem' }}>Hi, I am AI</p>
                            <div className="row">
                                
                                <div id="profile-customized-btn" className="profile-customized-btn customized-btn">
                                    <img className="icon-customized-btn" src="Assets/Images/Store/Rectangle -2.png" alt="profile" />
                                    <p>Your profile</p>
                                </div>
                                
                                <div id="picture-customized-btn" className="picture-customized-btn customized-btn selected-customized-btn">
                                    <img className="icon-customized-btn" src="Assets/Images/Store/Rectangle 34.png" alt="Images" />
                                    <p>Instag of <br /> your own</p>
                                </div>
                                <div id="video-customized-btn" className="video-customized-btn customized-btn">
                                    <img className="icon-customized-btn" src="/Assets/Images/Store/Rectangle 33.png" alt="videos" />
                                    <p>Instag videos <br /> of your own</p>
                                </div>
                            </div>
                        </div> 
                        <div className="col-xl-11 col-md-12 storage-tab " id="picture-storage-container">
                            <div className="row text-center text-lg-left overflow-auto">
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="d-block mb-4 h-100">
                                        <div className="img-card">
                                            <img className="img-fluid img-thumbnail downloaded-img" src="Assets/Images/Gallery/1.png" alt="" />
                                            <div className="card__text">
                                                <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                                <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="d-block mb-4 h-100">
                                        <div className="img-card">
                                            <img className="img-fluid img-thumbnail downloaded-img" src="Assets/Images/Gallery/2.png" alt="" />
                                            <div className="card__text">
                                                <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                                <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="d-block mb-4 h-100">
                                        <div className="img-card">
                                            <img className="img-fluid img-thumbnail downloaded-img" src="Assets/Images/Gallery/3.png" alt="" />
                                            <div className="card__text">
                                                <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                                <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="d-block mb-4 h-100">
                                        <div className="img-card">
                                            <img className="img-fluid img-thumbnail downloaded-img" src="Assets/Images/Gallery/4.png" alt="" />
                                            <div className="card__text">
                                                <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                                <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="d-block mb-4 h-100">
                                        <div className="img-card">
                                            <img className="img-fluid img-thumbnail downloaded-img" src="Assets/Images/Gallery/5.png" alt="" />
                                            <div className="card__text">
                                                <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                                <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="d-block mb-4 h-100">
                                        <div className="img-card">
                                            <img className="img-fluid img-thumbnail downloaded-img" src="Assets/Images/Gallery/6.png" alt="" />
                                            <div className="card__text">
                                                <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                                <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="d-block mb-4 h-100">
                                        <div className="img-card">
                                            <img className="img-fluid img-thumbnail downloaded-img" src="Assets/Images/Gallery/7.png" alt="" />
                                            <div className="card__text">
                                                <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                                <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="d-block mb-4 h-100">
                                        <div className="img-card">
                                            <img className="img-fluid img-thumbnail downloaded-img" src="Assets/Images/Gallery/8.png" alt="" />
                                            <div className="card__text">
                                                <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                                <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="d-block mb-4 h-100">
                                        <div className="img-card">
                                            <img className="img-fluid img-thumbnail downloaded-img" src="Assets/Images/Gallery/9.png" alt="" />
                                            <div className="card__text">
                                                <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                                <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="d-block mb-4 h-100">
                                        <div className="img-card">
                                            <img className="img-fluid img-thumbnail downloaded-img" src="Assets/Images/Gallery/10.png" alt="" />
                                            <div className="card__text">
                                                <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                                <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="img-card">
                                        <img className="img-fluid img-thumbnail downloaded-img" src="Assets/Images/Gallery/11.png" alt="" />
                                        <div className="card__text">
                                            <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                            <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div className="d-block mb-4 h-100">
                                        <div className="img-card">
                                            <img className="img-fluid img-thumbnail downloaded-img" src="https://source.unsplash.com/p2TQ-3Bh3Oo/400x300" alt="" />
                                            <div className="card__text">
                                                <p className="card__title"><button type="button" className="btn btn-outline-secondary"><i className="fas fa-download" /></button></p>
                                                <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div className="col-xl-11 col-md-12 storage-tab overflow-auto" id="profile-storage-container">
                            <div className="row">
                                <div id="left-side" className="col-lg-6 col-md-12">
                                    <form className="form-group">
                                        <div className="mt-2 w-75 ">
                                            <label htmlFor="first_name">First name</label>
                                            <input className="w-100 form-control" type="text" name="first_name" id="first_name" />
                                        </div>
                                        <div className="mt-2 w-75 ">
                                            <label htmlFor="last_name">Last name</label>
                                            <input className="w-100 form-control" type="text" name="last_name" id="last_name" />
                                        </div>
                                        <div className="mt-2 w-75 ">
                                            <label htmlFor="birthday">Birthday</label>
                                            <input className="w-100 form-control" type="date" name="birthday" id="birthday" />
                                        </div>
                                        <div className="mt-2 w-75 ">
                                            <label htmlFor="phone">Phone</label>
                                            <input className="w-100 form-control" type="text" name="phone" id="phone" />
                                        </div>
                                        <div className="mt-2 w-75 ">
                                            <label htmlFor="email">Email</label>
                                            <input className="w-100 form-control" type="text" name="email" id="email" />
                                        </div>
                                        <button id="btn-apply-profile" className="btn-apply rounded">Apply</button>
                                    </form>
                                </div>
                                <div id="right-side" className="col-lg-6 col-md-12">
                                    <form className="form-group">
                                        <div className="mt-2 w-75 ">
                                            <label htmlFor="current_password">Current password</label>
                                            <input className="w-100 form-control" type="text" name="current_password" id="current_password" />
                                        </div>
                                        <div className="mt-2 w-75 ">
                                            <label htmlFor="new_password1">New password</label>
                                            <input className="w-100 form-control" type="password" name="new_password1" id="new_password1" />
                                        </div>
                                        <div className="mt-2 w-75 ">
                                            <label htmlFor="new_password2">Confirm new password</label>
                                            <input className="w-100 form-control" type="password" name="new_password2" id="new_password2" />
                                        </div>
                                        <button id="btn-change-password w-100" className="btn-apply rounded">Change
                      Password</button>
                                    </form>
                                </div>
                            </div>
                        </div> 
                        <div className="col-xl-11 col-md-12 storage-tab" id="video-storage-container">
                            Loading...
            </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Storage;
