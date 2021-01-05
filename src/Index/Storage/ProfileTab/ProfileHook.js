import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { MY_ACCOUNT_INFO_URL, UPDATE_MY_ACCOUNT_INFO_URL } from '../../../utils/config.url'
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
const Profile = (props) => {
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        birthday: 0,
        phone: "",
        email: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [birthdayIsoStandard, setBirthdayIsoStandard] = useState("2020-10-12");
    const [avatarSrc, setAvatarSrc] = useState(""); //eslint-disable-line
    const [disableUpdateInfoBtn, setDisableUpdateInfoBtn] = useState(false);
    const [message, setMessage] = useState("");//eslint-disable-line
    const [error, setError] = useState("");//eslint-disable-line

    useEffect(()=>{
        (async ()=>{
            config['url'] = MY_ACCOUNT_INFO_URL;
            config['method'] = 'GET';

            try {
                const dataProfile = (await axios.request(config))['data'];

                if (dataProfile) {
                    setIsLoading(false);

                    await setInput(dataProfile);

                    setBirthdayIsoStandard(convertTimeStampToDate(dataProfile['birthday'])) ;
                }

            } catch (error) {
                if (error.response) {
                    console.error('Error:', error.response.data.message);

                }
                else {
                    console.log("Something went wrong. Please check your internet connection.");
                }
            }
        })()
    },[]) //eslint-disable-line

    const updateInputProfile = async (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        if (name === 'birthday') {
            setInput({
                    ...input,
                    [name]: (new Date(value).getTime()) / 1000,
                })
            setBirthdayIsoStandard(value);
        }
        else {
            setInput({
                ...input,
                [name]: value
            })
        }
    }

    const handleUpdateProfile = () => {
        let updateProfileData = {
            firstname: input['firstname'],
            lastname: input['lastname'],
            birthday: input['birthday'],
            email: input['email']
        };

        config['url'] = UPDATE_MY_ACCOUNT_INFO_URL;
        config['method'] = 'PUT';
        config['data'] = qs.stringify(updateProfileData);

        // Temp disable update btn
        setDisableUpdateInfoBtn(true);

        axios.request(config)
            .then(res => {
                let data = res.data;
                if (data) {
                    if (data['message'] === 'success') {
                        setMessage("Successfully update profile.");
                        alert("Update profile successfully.");
                    }
                }
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error:', error.response.data);
                    // setState for showing errors here.
                    setError(error.response.data['message']);
                }
                else {
                    setError("Something went wrong. Please check your internet connection.");
                }
            })
            .finally(() => {
                setDisableUpdateInfoBtn(false);
            });
    }

    // Helper function
    const renderInfoUser = () => {
        if (isLoading) {
            return (<p>Loading</p>)
        }
        else {
            return (
                <div>
                    <div className="form-group">
                        <input accept="image/*" className="d-none" id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <Tooltip title="Change avatar" arrow>
                                <Avatar src={avatarSrc}/>
                            </Tooltip>
                        </label>
                    </div>
                    <div className="form-group">
                        <div className="mt-2 w-50 ">
                            <label htmlFor="first_name">First name</label>
                            <input className="w-100 form-control" type="text" name="firstname" id="first_name" onChange={updateInputProfile} value={input['firstname']} />
                        </div>
                        <div className="mt-2 w-50 ">
                            <label htmlFor="last_name">Last name</label>
                            <input className="w-100 form-control" type="text" name="lastname" id="last_name" onChange={updateInputProfile} value={input['lastname']} />
                        </div>
                        <div className="mt-2 w-50 ">
                            <label htmlFor="birthday">Birthday</label>
                            <input className="w-100 form-control" type="date" name="birthday" id="birthday" onChange={updateInputProfile} value={birthdayIsoStandard} />
                        </div>
                        <div className="mt-2 w-50 ">
                            <label htmlFor="phone">Phone</label>
                            <input className="w-100 form-control" type="text" name="phone" id="phone" disabled value={input['phone']} />
                        </div>
                        <div className="mt-2 w-50 ">
                            <label htmlFor="email">Email</label>
                            <input className="w-100 form-control" type="text" name="email" id="email" onChange={updateInputProfile} value={input['email']} />
                        </div>
                        <button id="btn-apply-profile" className="btn-apply rounded" onClick={handleUpdateProfile} disabled={disableUpdateInfoBtn ? true : false}>Apply</button>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="col-xl-12 col-md-12 col-lg-12" id="profile-storage-container">
            <div className="row">
                <div id="left-side" className="col-lg-12 col-md-12">
                    {renderInfoUser()}
                </div>
            </div>
        </div>
    );
}
export default Profile;
