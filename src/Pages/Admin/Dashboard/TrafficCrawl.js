import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    colors,
} from 'ver-4-11';
import {
    makeStyles,
    useTheme,
} from '@material-ui/core';
import DashboardAPI from './DashboardAPI';
import {roundPercentNumber} from '../../../utils/convertTools';
import {axiosRequestErrorHandler} from '../../../utils/axiosRequestErrorHandler';
import CustomPieChart from './CustomPieChart';


const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    }
}));

const TrafficByCrawl = ({ className, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();
    
    const [percentUser, setPercentUser] = useState(0.0);
    const [countUser, setCountUser] = useState(0);
    const [percentAnonymous, setPercentAnonymous] = useState(0.0);
    const [countAnonymous, setCountAnonymous] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const data = {
        datasets: [
            {
                data: [percentUser, percentAnonymous],
                backgroundColor: [
                    colors.indigo[500],
                    // colors.red[600],
                    colors.orange[600]
                ],
                borderWidth: 8,
                borderColor: colors.common.white,
                hoverBorderColor: colors.common.white
            }
        ],
        labels: [`User (${countUser} times)`, `Anonymous (${countAnonymous} times)`]
    };

    const options = {
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.default,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    const crawl = [
        {
            title: 'User',
            value: percentUser,
            icon: "user-shield",
            color: colors.indigo[500]
        },
        {
            title: 'Anonymous',
            value: percentAnonymous,
            icon: "user-secret",
            color: colors.red[600]
        },
    ];

    useEffect(()=>{
        (async ()=>{
            const data = await axiosRequestErrorHandler(()=>DashboardAPI.getStatistic({type:"crawl"}));
            if(!data['error'] && data['data']){
                let crawlData = {};
                for(const el of data['data']['data']){
                    crawlData[el['type']] = el['count'];
                }
                setCountUser(crawlData['user']);
                setCountAnonymous(crawlData['anonymous']);
                setPercentUser(roundPercentNumber(crawlData['user']/crawlData['total'], 1));
                setPercentAnonymous(roundPercentNumber(crawlData['anonymous']/crawlData['total'], 1));
            }
            setIsLoading(false);
        })()
    },[])

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            <CardHeader title="Traffic by User's Search" />
            <Divider />
            <CardContent>
                <Box
                    height={300}
                    position="relative">
                    <Doughnut
                        data={data}
                        options={options}/>
                </Box>
                <CustomPieChart type="crawl" isLoading={isLoading} data={crawl}/>
            </CardContent>
        </Card>
    );
};

TrafficByCrawl.propTypes = {
    className: PropTypes.string
};

export default TrafficByCrawl;
