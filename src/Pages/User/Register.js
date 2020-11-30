import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import qs from 'query-string';
import { Modal } from 'react-bootstrap';
import './Verify.css';
import axios from 'axios';



const REGISTER_ENDPOINT = "https://dacnhk1.herokuapp.com/register";
const VERIFY_REGISTER_ENDPOINT = "https://dacnhk1.herokuapp.com/register/verify";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
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
}));

export default function SignUp() {
    const classes = useStyles();

    const [lastName, setLastName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [birthday, setBirthday] = React.useState("");
    const [password1, setPassword1] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [disableRegisterBtn, setDisableRegisterBtn] = React.useState(false);
    const [disableVerifyBtn, setDisableVerifyBtn] = React.useState(false);
    const [otp, setOtp] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [isOpenModal, setOpenModal] = React.useState(false);


    const updateInputRegister = (e) => {
        switch (e.target.id) {
            case 'firstName':
                setFirstName(e.target.value);
                break;
            case 'lastName':
                setLastName(e.target.value);
                break;
            case 'phone':
                setPhone(e.target.value);
                break;
            case 'birthday':
                setBirthday(new Date(e.target.value).getTime() / 1000);
                break;
            case 'password1':
                setPassword1(e.target.value);
                break;
            case 'password2':
                setPassword2(e.target.value);
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
        const registerForm = {
            firstname: firstName,
            lastname: lastName,
            phone: phone,
            birthday: birthday,
            password: password1
        };
        const config = {
            url: REGISTER_ENDPOINT,
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
                if(data['status'] === 'success'){
                    if(!resendOtp){
                        handleShowAndCloseModal();
                    }
                    setMessage(data['message']);
                }
            })
            .catch((error) => {
                console.error('Error:', error.response.data);
                // setState for showing errors here.
                setError(error.response.data['message']);
                setDisableRegisterBtn(false);
                // Sẽ disable nút resend code ở đây, sử dụng lại cái setDisableRegisterBtn cũng được, dùng setTimeOut các kiểu.
            });
    }

    const handleConfirmOtp = async () =>{
        const verifyForm = {
            phone: phone,
            otp: otp
        };
        const config = {
            url: VERIFY_REGISTER_ENDPOINT,
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
                if(data['status'] === 'success'){
                    console.log("success");
                    console.log(`Server msg: ${data['message']}`);
                }
            })
            .catch((error) => {
                console.error('Error:', error.response.data);
                // setState for showing errors here.
                setError(error.response.data['message']);
                setDisableVerifyBtn(false);
            });
    }
    const handleHitEnter = (e)=>{
        if(e.key === 'Enter'){
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
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
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
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid> */}
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="birthday"
                                label="Birthday"
                                type="date"
                                defaultValue="2020-02-02T10:30"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={updateInputRegister}
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>{handleRegister(false)}}
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
                </form>
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
                            {/* <div id="form">
                                <input type="number" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <input type="number" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <input type="number" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <input type="number" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <input type="number" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <input type="number" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <button class="btn btn-primary btn-embossed">Verify</button>
                            </div> */}
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
                            <div id="form" style={{margin: '0px auto 0'}}>
                                <button style={{margin: '20px auto 30px'}} class="btn btn-primary btn-embossed" 
                                    onClick={handleConfirmOtp} disabled={disableVerifyBtn}>
                                        Verify
                                </button>
                            </div>
                            <div>
                                Didn't receive the code?<br />
                                <p style={{marginBottom: 0}} className="btn" onClick={()=>{handleRegister(true)}} disabled={setDisableRegisterBtn}>Send code again</p><br />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button 
                        color="secondary" onClick={handleShowAndCloseModal}>
                        Close
                    </Button>
                    <Button
                        color="primary" onClick={handleConfirmOtp} disabled={disableVerifyBtn}>Verify</Button>
                </Modal.Footer> */}
            </Modal>
        </Container>

    );
}