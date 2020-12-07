import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Modal } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios'
import qs from 'querystring'

import {RESET_PASSWORD_URL, VERIFY_RESET_PASSWORD_URL} from '../../utils/config.url'



let configRequest = {
    url: null,
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: null
};

let classes = makeStyles((theme) => ({
    container: {
        maxWidth: 'lg'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    resize: {
        fontSize: 18,
    },
    labelRoot: {
        fontSize: 16,
    },
    labelFocused: {
        fontSize: 20,
    }
}));
class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // Open and close modal
            isOpenModal: false,
            disableRequestOtpBtn: false,
            
            // Input data
            phone: "",
            otp: "",
            pwd1: "",
            pwd2: "",

            // Stage of resetting password: "request" otp and "verify" otp
            stage: "request",

            // Errors
            error: "",
            errorVerify: "",
            errorOtp:"",
            errorPwd1: "",
            errorPwd2: ""
        }
    }

    openModal = () => {
        this.setState({ isOpenModal: true });
    }
    isEmptyOrSpaces = (str)=>{
        return str === null || str.match(/^ *$/) !== null;
    }

    validateInputResetPassword = async (name)=>{
        const otp = this.state.otp;
        const pwd1 = this.state.pwd1;
        const pwd2 = this.state.pwd2;

        if(name.includes('otp')){
                if (otp.length === 6 && !this.isEmptyOrSpaces(otp)) {
                    await this.setState({errorOtp: ""});
            }
            else{
                if (this.isEmptyOrSpaces(otp)) {
                    await this.setState({errorOtp: "Not allow empty"});
                }
                else if(otp.length !== 6){
                    await this.setState({errorOtp: "Enter 6-digits of verification code sent to your SMS."});
                }
            }
        }

        if(name.includes("pwd1")){
            if (pwd1.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) && !this.isEmptyOrSpaces(pwd1)) {
                await this.setState({errorPwd1: ""});
            }
            else {
                if (this.isEmptyOrSpaces(pwd1)) {
                    await this.setState({errorPwd1: "Not allow empty"});
                }
                else {
                    await this.setState({errorPwd1: "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase"});
                }
            }
        }
        
        if(name.includes("pwd2")){
            if (pwd2 === pwd1 && !this.isEmptyOrSpaces(pwd2)) {
                await this.setState({errorPwd2: ""});
            }
            else {
                if (this.isEmptyOrSpaces(pwd2)) {
                    await this.setState({errorPwd2: "Not allow empty"});
                }
                await this.setState({errorPwd2: "Re-type password not match"});
            }
        }
    }

    updateInputResetPassword = async (e)=>{
        const target = e.target;
        const value = target.value;
        const name = target.name;

        await this.setState({
            [name]: value
        });

        this.validateInputResetPassword(name);
    }

    handleHitEnter = (e) => {
        if (e.key === 'Enter') {
            if(this.state.stage === 'request'){
                this.handleRequestOtp();
            }
            else if (this.state.stage === 'verify'){
                this.handleVerifyOtp();
            }
        }
    }

    handleRequestOtp = async ()=>{
        const requestOtpForm = {
            phone: this.state.phone
        };
        
        configRequest['url'] = RESET_PASSWORD_URL;
        configRequest['data']= qs.stringify(requestOtpForm)

        this.setState({disableRequestOtpBtn: true});
        this.setState({error: ""});

        // When request otp succeed, change stage to verify and show modal verify otp.
        axios.request(configRequest)
            .then(response => response.data)
            .then(data => {
                if (data) {
                    if (data['status'] === 'pending') {
                        console.log("Waiting for verify OTP.");
                        console.log(`Server msg: ${data['message']}`);
                        
                        this.setState({ isOpenModal: true });
                        this.setState({ stage: 'verify' });
                    }
                }
            })
            .catch(async (error) => {
                if (error.response) {
                    console.error('Error:', error.response.data);
                    // setState for showing errors here.
                    await this.setState({error: error.response.data['message']})
                }
                else {
                    // Net work connection.
                    await this.setState({error: "Something went wrong. Please check your internet connection."})
                }
                this.setState({disableRequestOtpBtn: false});
            });
    }

    handleVerifyOtp = async ()=>{
        // Validate before allow to verify otp
        await this.validateInputResetPassword("otp, pwd1, pwd2");

        if(this.state.errorOtp || this.state.errorPwd1 || this.state.errorPwd2)
            return;

        const verifyOtpForm = {
            phone: this.state.phone,
            otp: this.state.otp,
            password: this.state.pwd1
        };

        configRequest['url'] = VERIFY_RESET_PASSWORD_URL;
        configRequest['data']= qs.stringify(verifyOtpForm);

        this.setState({errorVerify: ""});

        axios.request(configRequest)
            .then(response => response.data)
            .then(data => {
                if (data) {
                    if (data['status'] === 'success') {
                        console.log(`Server msg: ${data['message']}`);
                        
                        this.props.history.push('/login');
                    }
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error:', error.response.data);
                    // setState for showing errors here.
                    this.setState({errorVerify: error.response.data['message']})
                }
                else {
                    // Net work connection.
                    this.setState({errorVerify: "Something went wrong. Please check your internet connection."})
                }
            });
    }


    render() {
        return (
            <table align="center" cellPadding={0} style={{ borderSpacing: 0, fontFamily: '"Muli",Arial,sans-serif', color: '#333333', margin: '0 auto', width: '100%', maxWidth: '600px' }}>
                <tbody>
                    <tr>
                        <td align="center" className="vervelogoplaceholder" height={143} style={{ paddingTop: 0, paddingBottom: 0, paddingRight: 0, paddingLeft: 0, height: '143px', verticalAlign: 'middle' }} valign="middle"><span className="sg-image" data-imagelibrary="%7B%22width%22%3A%22160%22%2C%22height%22%3A34%2C%22alt_text%22%3A%22Verve%20Wine%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/79d8f4f889362f0c7effb2c26e08814bb12f5eb31c053021ada3463c7b35de6fb261440fc89fa804edbd11242076a81c8f0a9daa443273da5cb09c1a4739499f.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="#" target="_blank"><img alt="Verve Wine" height={34} src="https://marketing-image-production.s3.amazonaws.com/uploads/79d8f4f889362f0c7effb2c26e08814bb12f5eb31c053021ada3463c7b35de6fb261440fc89fa804edbd11242076a81c8f0a9daa443273da5cb09c1a4739499f.png" style={{ borderWidth: '0px', width: '160px', height: '34px' }} width={160} /></a></span></td>
                    </tr>
                    {/* Start of Email Body*/}
                    <tr>
                        <td className="one-column" >
                            {/*[if gte mso 9]>
                    <center>
                    <table width="80%" cellpadding="20" cellspacing="30"><tr><td valign="top">
                    <![endif]*/}
                            <table style={{ borderSpacing: 0 }} width="100%">
                                <tbody>
                                    <tr>
                                        <td align="center" className="inner" style={{ paddingTop: '15px', paddingBottom: '15px', paddingRight: '30px', paddingLeft: '30px' }} valign="middle"><span className="sg-image" data-imagelibrary="%7B%22width%22%3A%22255%22%2C%22height%22%3A93%2C%22alt_text%22%3A%22Forgot%20Password%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/35c763626fdef42b2197c1ef7f6a199115df7ff779f7c2d839bd5c6a8c2a6375e92a28a01737e4d72f42defcac337682878bf6b71a5403d2ff9dd39d431201db.png%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D">
                                            <img alt="Forgot Password" className="banner-reset" height={120} src="https://marketing-image-production.s3.amazonaws.com/uploads/35c763626fdef42b2197c1ef7f6a199115df7ff779f7c2d839bd5c6a8c2a6375e92a28a01737e4d72f42defcac337682878bf6b71a5403d2ff9dd39d431201db.png" style={{ borderWidth: '0px', marginTop: '30px', width: '355px', height: '153px' }} width={255} /></span></td>
                                    </tr>
                                    <tr>
                                        <td className="inner contents center" >
                                            <center>
                                                <p className="h1 center" style={{ margin: 0, textAlign: 'center', fontFamily: '"flama-condensed","Arial Narrow",Arial', fontWeight: 100, fontSize: '30px', marginBottom: '26px' }}>Forgot your password?</p>
                                                {/*[if (gte mso 9)|(IE)]><![endif]*/}

                                                <div className={classes.form} noValidate>
                                                    <Grid container spacing={4}>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                variant="outlined"
                                                                required
                                                                fullWidth
                                                                id="phone"
                                                                label="Phone Number"
                                                                name="phone"
                                                                autoComplete="0000000000"
                                                                onChange={this.updateInputResetPassword}
                                                                // error={this.state.phone ? true : false}
                                                                // helperText={error}
                                                                size="normal"
                                                                InputProps={{
                                                                    classes: {
                                                                        input: classes.resize,
                                                                        label: classes.resize,
                                                                    },
                                                                }}
                                                                InputLabelProps={{
                                                                    classes: {
                                                                        root: classes.labelRoot,
                                                                        focused: classes.labelFocused
                                                                    }
                                                                }}
                                                                onKeyDown={this.handleHitEnter}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                {/*[if (gte mso 9)|(IE)]><br>&nbsp;<![endif]*/}<span className="sg-image" data-imagelibrary="%7B%22width%22%3A%22260%22%2C%22height%22%3A54%2C%22alt_text%22%3A%22Reset%20your%20Password%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/c1e9ad698cfb27be42ce2421c7d56cb405ef63eaa78c1db77cd79e02742dd1f35a277fc3e0dcad676976e72f02942b7c1709d933a77eacb048c92be49b0ec6f3.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D">
                                                    <a onClick={this.handleRequestOtp} disabled={this.disableRequestOtpBtn}>
                                                        <img alt="Reset your Password" height={54} src="https://marketing-image-production.s3.amazonaws.com/uploads/c1e9ad698cfb27be42ce2421c7d56cb405ef63eaa78c1db77cd79e02742dd1f35a277fc3e0dcad676976e72f02942b7c1709d933a77eacb048c92be49b0ec6f3.png" style={{ borderWidth: '0px', marginTop: '30px', marginBottom: '50px', width: '355px', height: '54px' }} width={260} /></a></span>
                                                {/*[if (gte mso 9)|(IE)]><br>&nbsp;<![endif]*/}
                                            </center>
                                            <Collapse in={this.state.error ? true : false }>
                                                <Alert severity="error">
                                                    <AlertTitle>Error</AlertTitle>
                                                    { this.state.error }
                                                </Alert>
                                            </Collapse>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Modal
                                show={this.state.isOpenModal}
                                // onHide={handleShowAndCloseModal}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Body>
                                    <div id="wrapper">
                                        <div id="dialog">
                                            <h3>Please enter the 6-digit verification code we sent via SMS:</h3>
                                            <span>(we want to make sure it's you before we contact our movers)</span>
                                            <form className={classes.form} noValidate>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="otp"
                                                            label="OTP"
                                                            id="otp"
                                                            type="number"
                                                            onChange={this.updateInputResetPassword}
                                                            onKeyDown={this.handleHitEnter}
                                                            error={this.state.errorOtp ? true : false}
                                                            helperText={this.state.errorOtp}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="pwd1"
                                                            label="New password"
                                                            type="password"
                                                            id="pwd1"
                                                            onChange={this.updateInputResetPassword}
                                                            onKeyDown={this.handleHitEnter}
                                                            error={this.state.errorPwd1 ? true : false}
                                                            helperText={this.state.errorPwd1}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="pwd2"
                                                            label="Confirm password"
                                                            type="password"
                                                            id="pwd2"
                                                            onChange={this.updateInputResetPassword}
                                                            onKeyDown={this.handleHitEnter}
                                                            error={this.state.errorPwd2 ? true : false}
                                                            helperText={this.state.errorPwd2}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </form>
                                            <div className="mt-2 text-justify">
                                                <Collapse in={this.state.errorVerify ? true : false }>
                                                    <Alert severity="error">
                                                        <AlertTitle>Error</AlertTitle>
                                                        { this.state.errorVerify }
                                                    </Alert>
                                                </Collapse>
                                            </div>
                                            <div id="form" style={{ margin: '0px auto 0' }}>
                                                <button style={{ margin: '20px auto 30px' }} className="btn btn-primary btn-embossed"
                                                onClick={this.handleVerifyOtp}>
                                                    Verify
                                                </button>
                                            </div>
                                            <div>
                                                Didn't receive the code?<br />
                                                <p style={{ marginBottom: 0 }} className="btn"
                                                onClick={this.handleRequestOtp}
                                                >Send code again</p><br />
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                            {/*[if (gte mso 9)|(IE)]>
                    </td></tr></table>
                    </center>
                    <![endif]*/}
                        </td>
                    </tr>
                    {/* End of Email Body*/}
                    {/* whitespace */}
                    <tr>
                        <td height={40}>
                            <p style={{ lineHeight: '40px', padding: '0 0 0 0', margin: '0 0 0 0' }}>&nbsp;</p>
                            <p>&nbsp;</p>
                        </td>
                    </tr>
                    {/* Social Media */}
                    <tr>
                        <td align="center" style={{ paddingBottom: 0, paddingRight: 0, paddingLeft: 0, paddingTop: '0px' }} valign="middle"><span className="sg-image" data-imagelibrary="%7B%22width%22%3A%228%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Facebook%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/0a1d076f825eb13bd17a878618a1f749835853a3a3cce49111ac7f18255f10173ecf06d2b5bd711d6207fbade2a3779328e63e26a3bfea5fe07bf7355823567d.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://www.facebook.com/vervewine/" target="_blank"><img alt="Facebook" height={18} src="https://marketing-image-production.s3.amazonaws.com/uploads/0a1d076f825eb13bd17a878618a1f749835853a3a3cce49111ac7f18255f10173ecf06d2b5bd711d6207fbade2a3779328e63e26a3bfea5fe07bf7355823567d.png" style={{ borderWidth: '0px', marginRight: '21px', marginLeft: '21px', width: '8px', height: '18px' }} width={8} /></a></span>
                            {/*[if gte mso 9]>&nbsp;&nbsp;&nbsp;<![endif]*/}<span className="sg-image" data-imagelibrary="%7B%22width%22%3A%2223%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Twitter%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/6234335b200b187dda8644356bbf58d946eefadae92852cca49fea227cf169f44902dbf1698326466ef192bf122aa943d61bc5b092d06e6a940add1368d7fb71.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://twitter.com/vervewine" target="_blank"><img alt="Twitter" height={18} src="https://marketing-image-production.s3.amazonaws.com/uploads/6234335b200b187dda8644356bbf58d946eefadae92852cca49fea227cf169f44902dbf1698326466ef192bf122aa943d61bc5b092d06e6a940add1368d7fb71.png" style={{ borderWidth: '0px', marginRight: '16px', marginLeft: '16px', width: '23px', height: '18px' }} width={23} /></a></span>
                            {/*[if gte mso 9]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]*/}<span className="sg-image" data-imagelibrary="%7B%22width%22%3A%2218%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Instagram%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/650ae3aa9987d91a188878413209c1d8d9b15d7d78854f0c65af44cab64e6c847fd576f673ebef2b04e5a321dc4fed51160661f72724f1b8df8d20baff80c46a.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://www.instagram.com/vervewine/" target="_blank"><img alt="Instagram" height={18} src="https://marketing-image-production.s3.amazonaws.com/uploads/650ae3aa9987d91a188878413209c1d8d9b15d7d78854f0c65af44cab64e6c847fd576f673ebef2b04e5a321dc4fed51160661f72724f1b8df8d20baff80c46a.png" style={{ borderWidth: '0px', marginRight: '16px', marginLeft: '16px', width: '18px', height: '18px' }} width={18} /></a></span></td>
                    </tr>
                    {/* whitespace */}
                    <tr>
                        <td height={25}>
                            <p style={{ lineHeight: '25px', padding: '0 0 0 0', margin: '0 0 0 0' }}>&nbsp;</p>
                            <p>&nbsp;</p>
                        </td>
                    </tr>
                    {/* Footer */}
                    <tr>
                        <td style={{ paddingTop: 0, paddingBottom: 0, paddingRight: '30px', paddingLeft: '30px', textAlign: 'center', marginRight: 'auto', marginLeft: 'auto' }}>
                            <center>
                                <p style={{ fontFamily: '"Muli",Arial,sans-serif', margin: 0, textAlign: 'center', marginRight: 'auto', marginLeft: 'auto', fontSize: '15px', color: '#a1a8ad', lineHeight: '23px' }}>Problems or questions? Call us at
                                <nobr><a className="tel" href="tel:2128102899" style={{ color: '#a1a8ad', textDecoration: 'none' }} target="_blank"><span style={{ whiteSpace: 'nowrap' }}>212.810.2899</span></a></nobr>
                                </p>
                                <p style={{ fontFamily: '"Muli",Arial,sans-serif', margin: 0, textAlign: 'center', marginRight: 'auto', marginLeft: 'auto', fontSize: '15px', color: '#a1a8ad', lineHeight: '23px' }}>or email <a href="mailto:hello@vervewine.com" style={{ color: '#a1a8ad', textDecoration: 'underline' }} target="_blank">hello@vervewine.com</a></p>
                                <p style={{ fontFamily: '"Muli",Arial,sans-serif', margin: 0, textAlign: 'center', marginRight: 'auto', marginLeft: 'auto', paddingTop: '10px', paddingBottom: '0px', fontSize: '15px', color: '#a1a8ad', lineHeight: '23px' }}>© Verve Wine <span style={{ whiteSpace: 'nowrap' }}>24 ​Hubert S​t​</span>, <span style={{ whiteSpace: 'nowrap' }}>Ne​w Yor​k,</span> <span style={{ whiteSpace: 'nowrap' }}>N​Y 1​0013</span></p>
                            </center>
                        </td>
                    </tr>
                    {/* whitespace */}
                    <tr>
                        <td height={40}>
                            <p style={{ lineHeight: '40px', padding: '0 0 0 0', margin: '0 0 0 0' }}>&nbsp;</p>
                            <p>&nbsp;</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default ResetPassword;
