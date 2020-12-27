import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography,
    makeStyles,
    colors,
    Box
} from 'ver-4-11';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    },
    avatar: {
        backgroundColor: colors.orange[600],
        height: 56,
        width: 56
    }
}));

const TotalDifferentLink = ({ className, totalDifferentLink, ...rest }) => {
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
                            COVERAGE
                        </Typography>
                        <Box display="inline">
                            <Typography style={{ flex: 1 }}
                                color="textPrimary"
                                variant="h4"
                            >
                                {totalDifferentLink}
                            </Typography>
                            <Typography
                                color="textPrimary"
                                variant="h5"
                            >
                                different URLs
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <PublicIcon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

TotalDifferentLink.propTypes = {
    className: PropTypes.string
};

export default TotalDifferentLink;
