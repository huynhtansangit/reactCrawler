import React from 'react';
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
// import Budget from './Budget';
// import LatestOrders from './LatestOrders';
// import LatestProducts from './LatestProducts';
// import Sales from './Sales';
import TotalAddToCollection from './TotalAddToCollection';
import TotalCollection from './TotalCollection';
import TotalCrawl from './TotalCrawl';
import TotalUsers from './TotalUsers';
import Link from './TrafficCrawl';
import Platform from './TrafficPlatform';

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
                        <TotalAddToCollection />
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
                    {/*<Grid
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        <Sales />
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <TrafficByDevice />
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <LatestProducts />
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        <LatestOrders />
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <Link/>
                    </Grid> */}
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
                </Grid>
            </Container>
        </Page>
    );
};

export default Dashboard;
