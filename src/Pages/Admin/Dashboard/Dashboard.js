import React, { useState } from 'react';
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import TotalDifferentLink from './TotalDifferentLink';
import TotalCollection from './TotalCollection';
import TotalCrawl from './TotalCrawl';
import TotalUsers from './TotalUsers';
import Link from './TrafficCrawl';
import Platform from './TrafficPlatform';
import MostSearchingUser from './MostSearchingUser'
import MostSearchingUrl from './MostSearchingUrl'
import MostAddedItem from './MostAddedItem'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const Dashboard = () => {
    const classes = useStyles();
    const [countDifferentLink, setCountDifferentLink] = useState(0);

    return (
        <Page
            className={classes.root}
            title="Dashboard"
        >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalUsers />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalCrawl />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalDifferentLink totalDifferentLink={countDifferentLink} />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalCollection />
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        md={12}
                        xl={6}
                        xs={12}
                    >
                        <MostSearchingUrl onReceiveCountLink={(count)=>setCountDifferentLink(count)} />
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        md={6}
                        xl={6}
                        xs={12}
                    >
                        <MostAddedItem />
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <Link/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <Platform/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <MostSearchingUser />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
};

export default Dashboard;
