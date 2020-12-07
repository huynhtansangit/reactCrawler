import React, { Component } from 'react';

class ProfileContent extends Component {
    render() {
        return (
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
        );
    }
}

export default ProfileContent;
