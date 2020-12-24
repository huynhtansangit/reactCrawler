import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import ListUserAPI from './ListUserAPI'


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
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        (async ()=>{
            const data = await ListUserAPI.getUsers();
            setUsers(data['users']);
        })()
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
