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
const REGISTER_ENDPOINT = "https://dacnhk1.herokuapp.com/register";
const VERIFY_REGISTER_ENDPOINT = "https://dacnhk1.herokuapp.com/register/verify";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
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
    resize: {
        fontSize: 18,
    },
    labelRoot:{
        fontSize: 16,
    },
    labelFocused:{
        fontSize: 20,
    }
}));

export default function SignUp() {
    const classes = useStyles();

    const [lastName, setLastName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [birthday, setBirthday] = React.useState("");
    const [password1, setPassword1] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    //  Error configuration
    const [errorPhone, setErrorPhone] = React.useState(false);
    const [errorPwd, setErrorPwd] = React.useState(false);
    const [errorRetypePwd, setErrorRetypePwd] = React.useState(false);
    // -------
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
                if (e.target.value.match(/^0(1\d{9}|9\d{8})$/)) {
                    setErrorPhone(false);
                    setError("");
                }
                else {
                    setErrorPhone(true);
                    setError("Invalid format: ###-###-####");
                }
                break;
            case 'birthday':
                setBirthday(new Date(e.target.value).getTime() / 1000);
                break;
            case 'password1':
                if (e.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
                    setErrorPwd(false);
                    setError("");
                }
                else {
                    setErrorPwd(true);
                    setError("Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase");
                }
                setPassword1(e.target.value);
                break;
            case 'password2':
                if (e.target.value == password1) {
                    setErrorRetypePwd(false);
                    setError("");
                }
                else {
                    setErrorRetypePwd(true);
                    setError("Password not matched");
                }
                setPassword2(e.target.value);
                break;
            default:
                break;
        }
    }
    const handleShow = () => {
        setOpenModal(true);
    }
    const handleClose = () => {
        setOpenModal(false);
    }

    const handleRegister = async () => {
        const registerForm = {
            firstname: firstName,
            lastname: lastName,
            phone: phone,
            birthday: birthday,
            password: password1
        };
        const option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: qs.stringify(registerForm)
        };

        try {
            const response = await fetch(REGISTER_ENDPOINT, option);
            const data = await response.json();

            // Handle error: user not exist or wrong password => data {"message": "...."}
            if (data['message']) {
                setMessage(data['message']);
            }
            // No error.
            else {
            }

        } catch (error) {
            console.log(error);
            // setState for showing errors here.
            setError(error);
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
                                error={errorPhone}
                                helperText={error}
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
                                error={errorPwd}
                                helperText={error}
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
                                error={errorRetypePwd}
                                helperText={error}
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
                        onClick={handleShow}>
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
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Body>
                    <div id="wrapper">
                        <div id="dialog">
                            <h3>Please enter the 6-digit verification code we sent via SMS:</h3>
                            <span>(we want to make sure it's you before we contact our movers)</span>
                            <div id="form">
                                <input type="number" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <input type="number" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <input type="number" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <input type="number" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <input type="number" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <input type="number" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <button class="btn btn-primary btn-embossed">Verify</button>
                            </div>

                            <div>
                                Didn't receive the code?<br />
                                <a href="#">Send code again</a><br />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        color="primary" >Submit</Button>
                </Modal.Footer>
            </Modal>
        </Container>

    );
}