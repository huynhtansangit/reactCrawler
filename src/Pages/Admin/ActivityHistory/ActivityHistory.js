import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import data from '../ListUser/testData';
import { ClearAllTwoTone } from '@material-ui/icons';
import historyApi from './api/historyApi';
// import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const ActivityHistory = () => {
    const classes = useStyles();
    const [history] = useState(data);

    // didmount
    useEffect(() => {
        // API here
        // axios.request({});
        const fetchHistoryList = async () => {
            try {
                const params = {
                    offset: 0,
                    limit: 10,
                    type: 'crawl',
                    from: 0,
                    to: 1789789789
                }
                const response = await historyApi.get10Elements(params);
                console.log(response);
            } catch (error) {
                console.log('Fail to fetch: ', error);
            }
        }
        fetchHistoryList();
    }, []);

    // didupdate
    useEffect(() => {

    });

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

export default ActivityHistory;
