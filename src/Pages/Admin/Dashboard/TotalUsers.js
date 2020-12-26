import React from 'react';
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
        color: colors.green[900]
    },
    differenceValue: {
        color: colors.green[900],
        marginRight: theme.spacing(1)
    }
}));

const TotalCustomers = ({ className, ...rest }) => {
    const classes = useStyles();

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
                            1,600
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
                         1540 users are verified
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
