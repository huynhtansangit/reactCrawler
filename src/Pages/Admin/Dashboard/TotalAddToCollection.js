import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    Typography,
    makeStyles,
    colors
} from 'ver-4-11';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

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

const TasksProgress = ({ className, ...rest }) => {
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
                            TOTAL LOGIN
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            75 times
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <InsertChartIcon />
                        </Avatar>
                    </Grid>
                </Grid>
                <Box mt={3}>
                    <LinearProgress
                        value={75.5}
                        variant="determinate"
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

TasksProgress.propTypes = {
    className: PropTypes.string
};

export default TasksProgress;
