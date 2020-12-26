import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
    colors,
} from 'ver-4-11';
import {
    makeStyles,
    useTheme,
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    }
}));

const TrafficByDevice = ({ className, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();

    const data = {
        datasets: [
            {
                data: [85, 15],
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
        labels: ['User', 'Anonymous']
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

    const devices = [
        {
            title: 'User',
            value: 86,
            icon: "user-shield",
            color: colors.indigo[500]
        },
        {
            title: 'Anonymous',
            value: 14,
            icon: "user-secret",
            color: colors.red[600]
        },
    ];

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            <CardHeader title="Traffic by User's Crawl" />
            <Divider />
            <CardContent>
                <Box
                    height={300}
                    position="relative">
                    <Doughnut
                        data={data}
                        options={options}/>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    mt={2}>
                    {devices.map(({
                        color,
                        icon,
                        title,
                        value
                    }) => (
                        <Box
                            key={title}
                            p={1}
                            textAlign="center">
                            {/* <Icon color="action" /> */}
                            <i class={`fas fa-${icon}`}></i>
                            <Typography
                                color="textPrimary"
                                variant="body1">
                                {title}
                            </Typography>
                            <Typography
                                style={{ color }}
                                variant="h5">
                                {value}%
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

TrafficByDevice.propTypes = {
    className: PropTypes.string
};

export default TrafficByDevice;
