import React, { Component } from 'react';
import axios from 'axios'
import { MY_ACCOUNT_INFO_URL, UPDATE_MY_ACCOUNT_INFO_URL, MY_AVATAR_URL } from '../../../utils/config.url'
import cookies from '../../../utils/cookie'
import qs from 'querystring'
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';
import Tooltip from '@material-ui/core/Tooltip';
import { convertTimeStampToDate } from '../../../utils/convertTools';


const accessToken = cookies.get('accessToken');
let config = {
    url: '',
    method: '',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${accessToken}`
    },
};


const useStyles = makeStyles((theme) => ({
    input: {
        display: "none",
    },
    large: {
        width: '200px',
        height: '200px',
    },
}));
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
            birthdayIsoStandard: "2020-10-12", //yyyy-mm-dd
            avatarSrc: ""
        };
    }

    async componentDidMount() {
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
            const dataProfile = (await axios.request(config))['data'];

            if (dataProfile) {
                this.setState({ loading: false });

                for (const key in dataProfile) {
                    this.setState({ [key]: dataProfile[key] })
                }

                this.setState({ birthdayIsoStandard: convertTimeStampToDate(this.state.birthday) });
            }

            // Get avatar
            config['url'] = MY_AVATAR_URL;
            const dataAvatar = (await axios.request(config))['data'];

            if (dataAvatar) {
                // const binary =  new Buffer(dataAvatar.data.toString(), 'binary')
                // await this.setState({avatar: `data:image/jpeg;base64,${binary}`});
            }
        } catch (error) {
            if (error.response) {
                console.error('Error:', error.response.data);

                // setError(error.response.data['message']);
            }
            else {
                console.log("Something went wrong. Please check your internet connection.");
            }
        }

        // CÁCH 1:
        // LỖI KHÔNG HIỂN THỊ ĐƯỢC AVATAR Ở ĐÂY, LƯU URL VÀO STATE.AVATAR SRC.
        // CÁCH DƯỚI ĐÃ THỬ, RA URL NHƯNG KHÔNG SHOW.

        // CÁCH 2: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
        config['url'] = MY_AVATAR_URL;
        try {
            const rawAvatar = (await axios.request(config))['data'];

            if(rawAvatar){
                const b64Avatar = window.btoa(unescape(encodeURIComponent(rawAvatar)));
                console.log(b64Avatar);
                this.setState({avatarSrc: 'data:image/png,base64,'+b64Avatar});
            }
        } catch (error) {
            console.log(error);
        }
    }

    componentDidUpdate() {
    }

    updateInputProfile = async (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        if (name === 'birthday') {
            console.log("birthday");
            console.log(`Birthday before is: ${this.state.birthday}`);
            console.log(`Birthday Iso before is: ${this.state.birthdayIsoStandard}`);
            await this.setState({
                [name]: (new Date(value).getTime()) / 1000,
                birthdayIsoStandard: value
            });
            console.log(`Birthday after is: ${this.state.birthday}`);
            console.log(`Birthday Iso after is: ${this.state.birthdayIsoStandard}`);
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
        config['data'] = qs.stringify(updateProfileData);

        // Temp disable update btn
        this.setState({ disableUpdateInfoBtn: true });

        axios.request(config)
            .then(res => {
                let data = res.data;
                if (data) {
                    if (data['message'] === 'success') {
                        this.setState({ message: "Successfully update profile." });
                    }
                }
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error:', error.response.data);
                    // setState for showing errors here.
                    this.setState({ error: error.response.data['message'] });
                }
                else {
                    this.setState({ error: "Something went wrong. Please check your internet connection." });
                }
            })
            .finally(() => {
                this.setState({ disableUpdateInfoBtn: false });
            });
    }

    render() {
        // Helper function
        // const { classes } = this.props;
        const renderInfoUser = () => {
            if (this.state.loading) {
                return (<p>Loading</p>)
            }
            else {
                return (
                    <div>
                        <div className="form-group">
                            <input accept="image/*" className="d-none" id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                                <Tooltip title="Change avatar" arrow>
                                    <Avatar src={this.state.avatar}/>
                                </Tooltip>
                            </label>
                            <img src={this.state.avatarSrc} alt="avatar"/>
                        </div>
                        <div className="form-group">
                            <div className="mt-2 w-50 ">
                                <label htmlFor="first_name">First name</label>
                                <input className="w-100 form-control" type="text" name="firstname" id="first_name" onChange={this.updateInputProfile} value={this.state.firstname} />
                            </div>
                            <div className="mt-2 w-50 ">
                                <label htmlFor="last_name">Last name</label>
                                <input className="w-100 form-control" type="text" name="lastname" id="last_name" onChange={this.updateInputProfile} value={this.state.lastname} />
                            </div>
                            <div className="mt-2 w-50 ">
                                <label htmlFor="birthday">Birthday</label>
                                <input className="w-100 form-control" type="date" name="birthday" id="birthday" onChange={this.updateInputProfile} value={this.state.birthdayIsoStandard} />
                            </div>
                            <div className="mt-2 w-50 ">
                                <label htmlFor="phone">Phone</label>
                                <input className="w-100 form-control" type="text" name="phone" id="phone" disabled value={this.state.phone} />
                            </div>
                            <div className="mt-2 w-50 ">
                                <label htmlFor="email">Email</label>
                                <input className="w-100 form-control" type="text" name="email" id="email" onChange={this.updateInputProfile} value={this.state.email} />
                            </div>
                            <button id="btn-apply-profile" className="btn-apply rounded" onClick={this.handleUpdateProfile} disabled={this.state.disableUpdateInfoBtn ? true : false}>Apply</button>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="col-xl-12 col-md-12 col-lg-12 overflow-auto" id="profile-storage-container">
                <div className="row">
                    <div id="left-side" className="col-lg-12 col-md-12">
                        {renderInfoUser()}
                    </div>
                </div>
            </div>
        );
    }
}
export default withStyles(useStyles, { withTheme: true })(ProfileContent);
