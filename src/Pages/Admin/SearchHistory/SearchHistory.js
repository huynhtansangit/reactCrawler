import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import data from '../ListUser/testData';
// import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const SearchHistory = () => {
    const classes = useStyles();
    const [history] = useState(data);

    useEffect(()=>{
        // API here
        // axios.request({});
    },[]);

    return (
        <Page className={classes.root} title="Users">
            <Container maxWidth={false}>
                {/* <Toolbar/> */}
                <Box mt={3}>
                    <Results data={history} />
                </Box>
            </Container>
        </Page>
    );
};

export default SearchHistory;
