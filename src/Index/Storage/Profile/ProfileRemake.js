import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import InputComponent from './InputComponent';
import Avatar from '@material-ui/core/Avatar';
import './style.css';
import { Grid, Paper } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const convertTimeStampToDate = (timestamp) => {
    return new Date(timestamp);
}
class ProfileRemake extends Component {


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid justify="center"
                    alignItems="center" container spacing={3}>
                    <Grid
                        item xs={6}>
                        <Paper className={classes.paper}>
                            <div className="form-group ">
                                <Avatar alt="Remy Sharp" src="data:image/jpeg;base64,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" />
                                <InputComponent
                                    id="first_name"
                                    name="firstname"
                                    htmlFor="first_name"
                                    title="First name"
                                    type="text"

                                />
                                <InputComponent
                                    id="last_name"
                                    name="lastname"
                                    htmlFor="last_name"
                                    title="Last name"
                                    type="text"
                                />
                                <InputComponent
                                    id="birthday"
                                    name="birthday"
                                    htmlFor="birthday"
                                    title="Birth day"
                                    type="date"
                                />
                                <InputComponent
                                    id="avatar"
                                    name="avatar"
                                    htmlFor="avatar"
                                    title="Avatar"
                                    type="file"
                                />
                                <InputComponent
                                    id="email"
                                    name="email"
                                    htmlFor="email"
                                    title="Email"
                                    type="text"
                                />
                                {/* <button id="btn-apply-profile" className="btn-apply rounded" onClick={this.updateInputProfile}>Apply</button> */}
                            </div>
                        </Paper>

                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
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
                                <button id="btn-change-password w-100" className="btn-apply rounded" onClick={this.updateTesting}>Change Password</button>
                            </div>
                        </Paper>

                    </Grid>
                </Grid>

            </div>

        );
    }
}
export default withStyles(useStyles)(ProfileRemake);
