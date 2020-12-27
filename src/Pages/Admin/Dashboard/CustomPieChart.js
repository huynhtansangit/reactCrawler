import React from 'react';
import {
    Box,
    Typography,
} from 'ver-4-11';

const CustomPieChart = (props) => {
    return (<Box
        display="flex"
        justifyContent="center"
        mt={2}>
        {props.data.map(({
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
                {
                    props.type === "platform" ?
                        <i style={{}} className={`fab fa-${icon}`} /> :
                        <i style={{}} className={`fas fa-${icon}`} />
                }
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
    </Box>)
}
export default CustomPieChart;
