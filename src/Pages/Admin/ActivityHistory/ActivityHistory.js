import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import { ClearAllTwoTone } from '@material-ui/icons';


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
    const [history,setHistory] = useState([]);
    
    // didMount
    useEffect(() => {
        // API here
        // axios.request({});
        
    }, []);

    // didUpdate
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
