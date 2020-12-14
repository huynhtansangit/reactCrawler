import React, { Component } from 'react';
import axios from 'axios'
import { MY_ACCOUNT_INFO_URL, UPDATE_MY_ACCOUNT_INFO_URL } from '../../utils/config.url'
import cookies from '../../utils/cookie'

const accessToken = cookies.get('accessToken');
let config = {
    url: '',
    method: '',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${accessToken}`
    },
};

const convertTimeStampToDate = (timestamp) => {
    return new Date(timestamp);
}

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
            testing: false
        };
        this.setState = this.setState.bind(this);
    }

    async componentDidMount() {
        console.log(this.state.testing);

        console.log("Didmount");
        config['url'] = MY_ACCOUNT_INFO_URL;
        config['method'] = 'GET';

        // axios.request(config)
        //     .then(res => res.data)
        //     .then(data => {
        //         if (data) {
        //             setInfoUser({
        //                 loading: false,
        //                 error: "",
        //                 data: data
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         console.log("Error occurred when trying to get your collection.");
        //         if (error.response) {
        //             setInfoUser({
        //                 loading: false,
        //                 error: error.response.data,
        //                 data: null
        //             })
        //             // alert(error.response.data);
        //         }
        //         else {
        //             alert("Something went wrong. Please check your internet connection.");
        //         }
        //     })

        try {
            const data = (await axios.request(config))['data'];

            if (data) {
                setTimeout(() => this.setState({ testing: "asdfasdfas" }), 5000);
                this.setState({ loading: false });

                for (const key in data) {
                    this.setState({ [key]: data[key] })
                }
            }
        } catch (error) {
            if (error.response) {
                console.error('Error:', error.response.data);

                // setError(error.response.data['message']);
                // Sẽ disable nút resend code ở đây, sử dụng lại cái setDisableRegisterBtn cũng được, dùng setTimeOut các kiểu.
            }
            else {
                console.log("Something went wrong. Please check your internet connection.");
            }
        }
    }

    componentDidUpdate() {
        console.log("Updated");
    }

    shouldComponentUpdate() { }

    updateTesting(){
        this.setState({testing: !this.state.testing});
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
        config['url'] = UPDATE_MY_ACCOUNT_INFO_URL;
        config['method'] = 'PUT';

        axios.request(config);
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
                        <p>this.state.firstname</p>
                        <div className="mt-2 w-75 ">
                            <label htmlFor="first_name">First name</label>
                            <input className="w-100 form-control" type="text" name="firstname" id="first_name" onChange={this.updateInputProfile} value={this.props.firstname} />
                        </div>
                        <div className="mt-2 w-75 ">
                            <label htmlFor="last_name">Last name</label>
                            <input className="w-100 form-control" type="text" name="lastname" id="last_name" onChange={this.updateInputProfile} value={this.props.lastname} />
                        </div>
                        <div className="mt-2 w-75 ">
                            <label htmlFor="birthday">Birthday</label>
                            <input className="w-100 form-control" type="date" name="birthday" id="birthday" onChange={this.updateInputProfile} value={() => { convertTimeStampToDate(this.props.birthday) }} />
                        </div>
                        <div className="mt-2 w-75 ">
                            <label htmlFor="phone">Phone</label>
                            <input className="w-100 form-control" type="text" name="phone" id="phone" disabled value={this.props.phone} />
                        </div>
                        <div className="mt-2 w-75 ">
                            <label htmlFor="email">Email</label>
                            <input className="w-100 form-control" type="text" name="email" id="email" onChange={this.updateInputProfile} value={this.props.email} />
                        </div>
                        <button id="btn-apply-profile" className="btn-apply rounded" onClick={this.updateInputProfile}>Apply</button>
                    </div>)
            }
        }

        return (
            <div className="col-xl-11 col-md-12 storage-tab overflow-auto" id="profile-storage-container">
                <div className="row">
                    <div id="left-side" className="col-lg-6 col-md-12">
                        {/* {renderInfoUser()} */}
                        <p>{this.state.testing}</p>
                    </div>
                    <div id="right-side" className="col-lg-6 col-md-12">
                        <div className="form-group">
                            <div className="mt-2 w-75 ">
                                <label htmlFor="current_password">{this.state.testing}</label>
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
                            <button id="btn-change-password w-100" className="btn-apply rounded" onClick={this.updateTesting}>Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileContent;
