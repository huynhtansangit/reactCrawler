import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    colors,
    makeStyles
} from 'ver-4-11';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import DashboardAPI from './DashboardAPI';
import {axiosRequestErrorHandler} from '../../../utils/axiosRequestErrorHandler';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    avatar: {
        backgroundColor: colors.green[600],
        height: 56,
        width: 56
    },
    differenceIcon: {
        marginRight: theme.spacing(1),
        color: colors.green[900]
    },
    differenceValue: {
        color: colors.green[900],
        marginRight: theme.spacing(1)
    }
}));

const TotalCustomers = ({ className, ...rest }) => {
    const classes = useStyles();

    const [countRegister, setCountRegister] = useState(0);
    const [countRegisterSuccess, setCountRegisterSuccess] = useState(0);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        (async ()=>{
            const data = await axiosRequestErrorHandler(()=>DashboardAPI.getStatistic({type:"register"}));
            if(!data['error'] && data['data']){
                let userData = {};
                for(const el of data['data']['data']){
                    userData[el['type']] = el['count'];
                }
                setCountRegister(userData['register']);
                setCountRegisterSuccess(userData['registerSuccess']);
            }
            // setIsLoading(false);
        })()
    },[])

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardContent>
                <Grid
                    container
                    justify="space-between"
                    spacing={3}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h6"
                        >
                            TOTAL USERS
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {countRegister}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <PeopleIcon />
                        </Avatar>
                    </Grid>
                </Grid>
                <Box
                    mt={2}
                    display="flex"
                    alignItems="center"
                >
                    <VerifiedUserIcon className={classes.differenceIcon}/>
                    <Typography
                        color="textSecondary"
                        variant="caption"
                    >
                        {countRegisterSuccess} users are verified
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

TotalCustomers.propTypes = {
    className: PropTypes.string
};

export default TotalCustomers;
