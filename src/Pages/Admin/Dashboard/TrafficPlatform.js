import React, {useState, useEffect} from 'react';
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
    useTheme
} from '@material-ui/core';
import DashboardAPI from './DashboardAPI';
import {roundPercentNumber} from '../../../utils/convertTools';
import CustomPieChart from './CustomPieChart';
import {axiosRequestErrorHandler} from '../../../utils/axiosRequestErrorHandler';


const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    }
}));

const TrafficByPlatform = ({ className, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [countInstagram, setCountInstagram] = useState(0);
    const [percentInstagram, setPercentInstagram] = useState(0.0);
    const [countFacebook, setCountFacebook] = useState(0);
    const [percentFacebook, setPercentFacebook] = useState(0.0);
    const [countTiktok, setCountTiktok] = useState(0);
    const [percentTiktok, setPercentTiktok] = useState(0.0);
    const [isLoading, setIsLoading] = useState(true);

    const data = {
        datasets: [
            {
                data: [percentInstagram, percentFacebook, percentTiktok],
                backgroundColor: [
                    colors.indigo[500],
                    colors.red[600],
                    colors.orange[600]
                ],
                borderWidth: 8,
                borderColor: colors.common.white,
                hoverBorderColor: colors.common.white
            }
        ],
        labels: [`Instagram (${countInstagram} times)`, `Facebook (${countFacebook} times)`, `Tiktok (${countTiktok} times)`]
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

    const platform = [
        {
            title: 'Instagram',
            value: percentInstagram,
            icon: "instagram",
            color: colors.indigo[500]
        },
        {
            title: 'Facebook',
            value: percentFacebook,
            icon: "facebook",
            color: colors.red[600]
        },
        {
            title: 'TikTok',
            value: percentTiktok,
            icon: "tiktok",
            color: colors.orange[600]
        }
    ];

    useEffect(()=>{
        (async ()=>{
            const data = await axiosRequestErrorHandler(()=>DashboardAPI.getStatistic({type:"platform"}));
            if(!data['error'] && data['data']){
                let total = 0;
                let platformData = {};
                for(const el of data['data']['data']){
                    total += el.count;
                    platformData[el['platform']] = el['count'];
                }
                setCountInstagram(platformData['instagram']);
                setCountFacebook(platformData['facebook']);
                setCountTiktok(platformData['tiktok']);
                setPercentInstagram(roundPercentNumber(platformData['instagram']/total, 1));
                setPercentFacebook(roundPercentNumber(platformData['facebook']/total, 1));
                setPercentTiktok(roundPercentNumber(platformData['tiktok']/total, 1));

                setIsLoading(false);
            }
        })()
    },[])

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            <CardHeader title="Traffic by Platform" />
            <Divider />
            <CardContent>
                <Box
                    height={300}
                    position="relative">
                    <Doughnut
                        data={data}
                        options={options}/>
                </Box>
                <CustomPieChart type="platform" isLoading={isLoading} data={platform}/>
            </CardContent>
        </Card>
    );
};

TrafficByPlatform.propTypes = {
    className: PropTypes.string
};

export default TrafficByPlatform;
