import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography,
    colors
} from 'ver-4-11';
import {makeStyles} from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import DashboardAPI from './DashboardAPI';
import {axiosRequestErrorHandler} from '../../../utils/axiosRequestErrorHandler';

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    },
    avatar: {
        backgroundColor: colors.indigo[600],
        height: 56,
        width: 56
    }
}));

const TotalProfit = ({ className, ...rest }) => {
    const classes = useStyles();
    // NOTE total crawl will use statistic register for data.
    const [totalCrawl, setTotalCrawl] = useState(0);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        (async ()=>{
            const data = await axiosRequestErrorHandler(()=>DashboardAPI.getStatistic({type:"crawl"}));
            if(!data['error'] && data['data']){
                for(const element of data['data']['data']){
                    if(element['type'] === "total"){
                        setTotalCrawl(element['count']);
                        break;
                    }
                };
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
                            TOTAL SEARCHING
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {totalCrawl} times
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <ImageSearchIcon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

TotalProfit.propTypes = {
    className: PropTypes.string
};

export default TotalProfit;
