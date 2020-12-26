import React, { useEffect} from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
// import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const Chart = () => {
    const classes = useStyles();

    useEffect(()=>{
        console.log("Chart");
        // API here
        // axios.request({});
    },[]);

    return (
        <Page className={classes.root} title="Chart">
            <Container maxWidth={false}>
                <Box mt={3}>
                    Chart
                    {/* <Results users={users} /> */}
                </Box>
            </Container>
        </Page>
    );
};

export default Chart;
