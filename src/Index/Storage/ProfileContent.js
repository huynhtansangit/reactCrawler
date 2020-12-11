import React, { Component } from 'react';
import axios from 'axios'
import { MY_ACCOUNT_INFO_URL, UPDATE_MY_ACCOUNT_INFO_URL } from '../../utils/config.url'
import cookies from '../../utils/cookie'
import qs from 'querystring'

const accessToken = cookies.get('accessToken');
let config = {
    url: '',
    method: '',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${accessToken}`
    },
};


class ProfileContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            birthday: 0,
            phone: "",
            email: "",
            loading: true,
            disableUpdateInfoBtn: false,
            message: "",
            error: ""
        };
        this.convertTimeStampToDate = this.convertTimeStampToDate.bind(this);
    }

    async componentDidMount() {
        config['url'] = MY_ACCOUNT_INFO_URL;
        config['method'] = 'GET';

        try {
            const data = (await axios.request(config))['data'];

            if (data) {
                // setTimeout(() => this.setState({ testing: "asdfasdfas" }), 5000);
                this.setState({ loading: false });

                for (const key in data) {
                    this.setState({ [key]: data[key] })
                }
            }
        } catch (error) {
            if (error.response) {
                console.error('Error:', error.response.data);

                this.setState({error: error.response.data['message']}); 
            }
            else {
                console.log("Something went wrong. Please check your internet connection.");
            }
        }
    }

    componentDidUpdate() {
    }

    convertTimeStampToDate = () => {
        console.log(new Date(this.state.birthday).toISOString().substr(0,10));
        return new Date(this.state.birthday).toISOString().substr(0,10);
    }

    updateInputProfile = async (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        if (name === 'birthday') {
            await this.setState({
                [name]: (new Date(value).getTime()) / 1000
            });
        }
        else {
            await this.setState({
                [name]: value
            });
        }
    }

    handleUpdateProfile = () => {
        let updateProfileData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            birthday: this.state.birthday,
            email: this.state.email
        };
        
        config['url'] = UPDATE_MY_ACCOUNT_INFO_URL;
        config['method'] = 'PUT';
        config['data'] = qs.stringify(updateProfileData)

        // Temp disable update btn
        this.setState({disableUpdateInfoBtn: true});

        axios.request(config)
            .then(res=>{
                let data = res.data;
                if(data){
                    if(data['message'] === 'success'){
                        this.setState({message: "Successfully update profile."});
                    }
                }
            })
            .catch(error=>{
                if (error.response) {
                    console.error('Error:', error.response.data);
                    // setState for showing errors here.
                    this.setState({error: error.response.data['message']}); 
                }
                else {
                    this.setState({error: "Something went wrong. Please check your internet connection."});
                }
            })
            .finally(()=>{
                this.setState({disableUpdateInfoBtn: false});
            });
    }

    render() {
        // Helper function
        const renderInfoUser = () => {
            if (this.state.loading) {
                return (<p>Loading</p>)
            }
            else {
                return (
                    <div className="form-group">
                        <div className="mt-2 w-75 ">
                            <label htmlFor="first_name">First name</label>
                            <input className="w-100 form-control" type="text" name="firstname" id="first_name" onChange={this.updateInputProfile} value={this.state.firstname} />
                        </div>
                        <div className="mt-2 w-75 ">
                            <label htmlFor="last_name">Last name</label>
                            <input className="w-100 form-control" type="text" name="lastname" id="last_name" onChange={this.updateInputProfile} value={this.state.lastname} />
                        </div>
                        <div className="mt-2 w-75 ">
                            <label htmlFor="birthday">Birthday</label>
                            <input className="w-100 form-control" type="date" name="birthday" id="birthday" onChange={this.updateInputProfile} value={ this.convertTimeStampToDate() } />
                        </div>
                        <div className="mt-2 w-75 ">
                            <label htmlFor="phone">Phone</label>
                            <input className="w-100 form-control" type="text" name="phone" id="phone" disabled value={this.state.phone} />
                        </div>
                        <div className="mt-2 w-75 ">
                            <label htmlFor="email">Email</label>
                            <input className="w-100 form-control" type="text" name="email" id="email" onChange={this.updateInputProfile} value={this.state.email} />
                        </div>
                        <button id="btn-apply-profile" className="btn-apply rounded" onClick={this.handleUpdateProfile} disabled={this.state.disableUpdateInfoBtn ? true: false}>Apply</button>
                    </div>)
            }
        }

        return (
            <div className="col-xl-11 col-md-12 storage-tab overflow-auto" id="profile-storage-container">
                <div className="row">
                    <div id="left-side" className="col-lg-6 col-md-12">
                        {renderInfoUser()}
                    </div>
                    <div id="right-side" className="col-lg-6 col-md-12">
                        <div className="form-group">
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
                            <button id="btn-change-password w-100" className="btn-apply rounded">Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileContent;
