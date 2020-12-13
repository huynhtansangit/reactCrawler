import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import { Alert, AlertTitle } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import qs from 'query-string';
import { Modal } from 'react-bootstrap';
import './Verify.css';
import axios from 'axios';
import { REGISTER_URL, VERIFY_REGISTER_URL } from '../../utils/config.url'



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.facebook.com/profile.php?id=100008181729852">
                Tan Thai Huy
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
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
function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}
export default function SignUp() {
    const classes = useStyles();

    const [lastName, setLastName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [birthday, setBirthday] = React.useState("");
    const [password1, setPassword1] = React.useState("");
    const [disableRegisterBtn, setDisableRegisterBtn] = React.useState(false);
    const [disableVerifyBtn, setDisableVerifyBtn] = React.useState(false);
    const [otp, setOtp] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    //  Error configuration
    const [errorFirstName, setErrorFirstName] = React.useState("");
    const [errorLastName, setErrorLastName] = React.useState("");
    const [errorPhone, setErrorPhone] = React.useState("");
    const [errorPwd, setErrorPwd] = React.useState("");
    const [errorRetypePwd, setErrorRetypePwd] = React.useState("");
    // -------
    const [isOpenModal, setOpenModal] = React.useState(false);
    const [isShowAlert, setShowAlert] = React.useState(false);
    const [countDownTime, setCountDownTime] = React.useState(0);

    const updateInputRegister = async (e) => {
        switch (e.target.id) {
            case 'firstName':
                let firstname = e.target.value;
                setFirstName(firstname);
                
                if (isEmptyOrSpaces(firstname)) 
                    setErrorFirstName("Not allow empty");
                else
                    setErrorFirstName("");

                break;
            case 'lastName':
                console.log(errorFirstName.message);
                let lastname = e.target.value;
                setLastName(lastname);
                
                if (isEmptyOrSpaces(lastname)) 
                    setErrorLastName("Not allow empty");
                else
                    setErrorLastName("");
                break;
            case 'phone':
                let phone = e.target.value;
                setPhone(phone);
                
                let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                if (phone.match(vnf_regex) && !isEmptyOrSpaces(phone)) {
                    setErrorPhone('');
                }
                else {
                    if (isEmptyOrSpaces(phone)) {
                        setErrorPhone('Not allow empty');
                    }
                    else {
                        setErrorPhone('Wrong format phone');
                    }
                }
                break;
            case 'birthday':
                setBirthday(new Date(e.target.value).getTime() / 1000);
                break;
            case 'password1':
                let password = e.target.value;
                setPassword1(password);
                
                if (password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) && !isEmptyOrSpaces(password)) {
                    setErrorPwd('');
                }
                else {
                    if (isEmptyOrSpaces(password)) {
                        setErrorPwd('Not allow empty');
                    }
                    else {
                        setErrorPwd('Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase');
                    }
                }
                break;
            case 'password2':
                let rePwd = e.target.value;
                
                if (rePwd === password1 && !isEmptyOrSpaces(rePwd)) {
                    setErrorRetypePwd('');
                }
                else {
                    if (isEmptyOrSpaces(rePwd)) {
                        setErrorRetypePwd('Not allow empty');
                    }
                    else setErrorRetypePwd('Re-type password not match');
                }
                break;
            case 'otp':
                setOtp(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleShowAndCloseModal = () => {
        setOpenModal(!isOpenModal);
    }

    const handleRegister = async (resendOtp) => {
        if(errorFirstName || errorLastName || errorPhone || errorRetypePwd || errorPwd){
            return;
        }

        const registerForm = {
            firstname: firstName,
            lastname: lastName,
            phone: phone,
            birthday: birthday,
            password: password1
        };
        const config = {
            url: REGISTER_URL,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(registerForm)
        };

        // Temporary disable btn after clicked.
        setDisableRegisterBtn(true);

        axios.request(config)
            .then(response => response.data)
            .then(data => {
                if (data['status'] === 'success') {
                    countDown(60);
                    
                    if (!resendOtp) {
                        handleShowAndCloseModal();
                    }
                    setMessage(data['message']);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error:', error.response.data);

                    setError(error.response.data['message']);
                    // Sẽ disable nút resend code ở đây, sử dụng lại cái setDisableRegisterBtn cũng được, dùng setTimeOut các kiểu.
                }
                else {
                    setError("Something went wrong. Please check your internet connection.");
                }
                setDisableRegisterBtn(false);
                setShowAlert(true);
            });
    }

    const countDown = (i)=>{
        var int = setInterval(function () {
            setCountDownTime(i);
            i-- || clearInterval(int);  //if i is 0, then stop the interval
        }, 1000);
    }

    const handleConfirmOtp = async () => {
        const verifyForm = {
            phone: phone,
            otp: otp
        };
        const config = {
            url: VERIFY_REGISTER_URL,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(verifyForm)
        };

        setDisableVerifyBtn(true);

        axios.request(config)
            .then(response => response.data)
            .then(data => {
                if (data) {
                    if (data['status'] === 'success') {
                        console.log("success");
                        console.log(`Server msg: ${data['message']}`);
                    }
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error:', error.response.data);
                    // setState for showing errors here.
                    setError(error.response.data['message']);
                }
                else {
                    setError("Something went wrong. Please check your internet connection.");
                }
                setDisableVerifyBtn(false);
            });
    }

    const handleHitEnter = (e) => {
        if (e.key === 'Enter') {
            handleConfirmOtp();
        }
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <div className={classes.form} noValidate>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={updateInputRegister}
                                size="normal"
                                error={errorFirstName ? true: false }
                                helperText={errorFirstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={updateInputRegister}
                                size="normal"
                                error={errorLastName ? true : false}
                                helperText={errorLastName}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                autoComplete="0000000000"
                                onChange={updateInputRegister}
                                error={errorPhone ? true : false}
                                helperText={errorPhone}
                                size="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="birthday"
                                label="Birthday"
                                type="date"
                                defaultValue="2020-02-02T10:30"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={updateInputRegister}
                                size="normal"
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password1"
                                autoComplete="current-password"
                                onChange={updateInputRegister}
                                error={errorPwd ? true : false}
                                helperText={errorPwd}
                                size="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Confirm Password"
                                type="password"
                                id="password2"
                                autoComplete="current-password"
                                onChange={updateInputRegister}
                                error={errorRetypePwd ? true : false}
                                helperText={errorRetypePwd}
                                size="normal"
                            />
                        </Grid>
                    </Grid>
                    <Collapse in={isShowAlert}>
                        <Alert severity="error"
                        >
                            <AlertTitle>Error</AlertTitle>
                            {errorFirstName ? errorFirstName : error} — <strong>check it out!</strong>
                        </Alert>
                    </Collapse>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => { handleRegister(false) }}
                        disabled={disableRegisterBtn}>
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/Login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
            <Modal
                show={isOpenModal}
                onHide={handleShowAndCloseModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <div id="wrapper">
                        <div id="dialog">
                            <h3>Please enter the 6-digit verification code we sent via SMS:</h3>
                            <span>(we want to make sure it's you before we contact our movers)</span>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="otp"
                                    label="Verify Phone Number"
                                    id="otp"
                                    onChange={updateInputRegister}
                                    onKeyDown={handleHitEnter}
                                />
                            </Grid>
                            <div id="form" style={{ margin: '0px auto 0' }}>
                                <button style={{ margin: '20px auto 30px' }} class="btn btn-primary btn-embossed"
                                    onClick={handleConfirmOtp} disabled={disableVerifyBtn}>
                                    Verify
                                </button>
                            </div>
                            <div>
                                Didn't receive the code?<br />
                                {
                                    countDownTime === 0 ?
                                    <p style={{ marginBottom: 0 }} className="btn" onClick={() => { handleRegister(true) }}>Send code again</p>
                                    : <p>You will be able to resend code after {countDownTime}s</p>
                                }
                                <br/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>

    );
}