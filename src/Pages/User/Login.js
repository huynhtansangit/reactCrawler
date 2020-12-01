import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import qs from 'query-string';
import Cookies from 'universal-cookie'
import axios from 'axios'
import { Redirect } from 'react-router';
import Collapse from '@material-ui/core/Collapse';
import { Alert, AlertTitle } from '@material-ui/lab';


const TOKEN_ENDPOINT = "https://dacnhk1.herokuapp.com/token";
const cookies = new Cookies();

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
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}
export default function SignInSide() {
  const classes = useStyles();
  const [phone, setPhone] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [disableLoginBtn, setDisableLoginBtn] = React.useState(false);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isShowAlert, setShowAlert] = React.useState(false);

  const [isValidatePhone, setIsValidatePhone] = React.useState(false);
  const [messagePhone, setMessagePhone] = React.useState("Phone must not be empty");

  const [isValidatePwd, setIsValidatePwd] = React.useState(false);
  const [messagePwd, setMessagePwd] = React.useState("Password must not be empty");

  const [isRememberChecked, setRemember] = React.useState(cookies.get('phone') ? true : false);

  const updateInputPhone = (event) => {
    let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let phone =event.target.value;
    if (isEmptyOrSpaces(phone)| !phone.match(vnf_regex)) {
      setIsValidatePhone(false);
      if (isEmptyOrSpaces(phone)){
        setMessagePhone("Phone must not be empty");

      }
      else {
      setMessagePhone("Wrong format phone number");
      }
    }
    else {
      setIsValidatePhone(true);
      setMessagePhone("");
    }
    setPhone(event.target.value);
  }

  const updateInputPassword = (event) => {
    if (isEmptyOrSpaces(event.target.value)) {
      setIsValidatePwd(false);
      setMessagePwd("Password must not be empty");
    }
    else {
      setIsValidatePwd(true);
      setMessagePwd("");
    }
    setPwd(event.target.value);
  }

  const checkRemember = () => {
    setRemember(!isRememberChecked);
  }

  const validateInputLogin = () => {
    const checkPhone = phone ? phone : cookies.get("phone");
    const checkPassword = pwd ? pwd : cookies.get("password");
    if (!checkPhone || !checkPassword) {
      setDisableLoginBtn(true);
    }
    else {
      setDisableLoginBtn(false);
    }
  }

  const handleLogin = async () => {
    console.log(messagePhone);
    console.log(messagePwd);
    const loginForm = {
      'phone': phone ? phone : cookies.get("phone"),
      'password': pwd ? pwd : cookies.get("password"),
      'grant_type': 'password'
    };

    const formData = qs.stringify(loginForm);

    const option = {
      url: TOKEN_ENDPOINT,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    };

    // Temporary disable btn after clicked.
    // setDisableLoginBtn(true);
    if (isValidatePhone & isValidatePwd) {
      setShowAlert(false);
      axios.request(option)
        .then(response => response.data)
        .then(data => {
          if (data) {
            cookies.set('accessToken', data['accessToken'], { path: '/' });
            cookies.set('refreshToken', data['refreshToken'], { path: '/' });
            cookies.set('expireAt', data['expireAt'], { path: '/' });

            setIsLoggedIn(true);

            if (isRememberChecked) {
              cookies.set('phone', phone, { path: '/login' });
              cookies.set('password', pwd, { path: '/login' });
            }
            else {
              cookies.set('phone', "", { path: '/login' });
              cookies.set('password', "", { path: '/login' });
            }
            // return(<Redirect to={{pathname: "/"}}/>)
          }
        })
        .catch((error) => {
          if (error.response) {
            console.error('Error:', error.response.data);
            // setState for showing errors here.
            if (error.response.status === 401 || error.response.status === 404)
              setError("Phone and/or password is incorrect.")
            else
              setError(error);
          }
          else {
            setError("Something went wrong. Please check your internet connection.");
          }
          setDisableLoginBtn(false);
          setShowAlert(true);
        });
    }
    else {
      setShowAlert(true);
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone number"
              name="phone"
              autoComplete="phone"
              autoFocus
              onChange={updateInputPhone}
              value={cookies.get("phone") ? cookies.get("phone") : phone}
              error={isValidatePhone}
              helperText={messagePhone}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={updateInputPassword}
              value={cookies.get("password") ? cookies.get("password") : pwd}
              error={isValidatePwd}
              helperText={messagePwd}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={isRememberChecked} onClick={checkRemember} />}
              label="Remember me"
            />
            <Collapse in={isShowAlert}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <p> {messagePhone} <br/> {messagePwd} — <strong>check it out!</strong></p> 
              </Alert>
            </Collapse>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => { handleLogin() }}
              disabled={disableLoginBtn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/reset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}