import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import data from './testData';
import Toolbar from './Toolbar';
// import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const ListUser = () => {
    const classes = useStyles();
    const [users, setUsers] = useState(data); // eslint-disable-line

    useEffect(()=>{
        // API here
        // axios.request({});
    },[]);

    return (
        <Page className={classes.root} title="Users">
            <Container maxWidth={false}>
                <Toolbar/>
                <Box mt={3}>
                    <Results data={users} />
                </Box>
            </Container>
        </Page>
    );
};

export default ListUser;
