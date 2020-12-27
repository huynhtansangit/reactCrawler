import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    colors,
    makeStyles
} from 'ver-4-11';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import CollectionsIcon from '@material-ui/icons/Collections';
import DashboardAPI from './DashboardAPI';
import {axiosRequestErrorHandler} from '../../../utils/axiosRequestErrorHandler';



const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    avatar: {
        backgroundColor: colors.red[600],
        height: 56,
        width: 56
    },
    differenceIcon: {
        // color: colors.red[900],
        marginRight: theme.spacing(1)
    },
    differenceValue: {
        // color: colors.red[900],
        marginRight: theme.spacing(1)
    }
}));

const Budget = ({ className, ...rest }) => {
    const classes = useStyles();

    const [collectionData, setCollectionData] = useState(0);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        (async ()=>{
            const data = await axiosRequestErrorHandler(()=>DashboardAPI.getStatistic({type:"collection"}));
            if(!data['error'] && data['data']){
                let collectionData = {};
                for(const el of data['data']['data']){
                    collectionData[el['type']] = el['count'];
                }
                setCollectionData(collectionData);
            }
            // setIsLoading(false);
        })()
    },[])

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardContent>
                <Grid
                    container
                    justify="space-between"
                    spacing={3}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h6"
                        >
                            TOTAL COLLECTIONS
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {collectionData.create}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <CollectionsIcon />
                        </Avatar>
                    </Grid>
                </Grid>
                <Box
                    mt={2}
                    display="flex"
                    alignItems="center"
                >
                    <AddToPhotosIcon className={classes.differenceIcon} />
                    <Typography
                        className={classes.differenceValue}
                        variant="h7"
                    >
                        {collectionData.addItem}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="caption"
                    >
                        times add to collections
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

Budget.propTypes = {
    className: PropTypes.string
};

export default Budget;
