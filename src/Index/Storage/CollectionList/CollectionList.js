import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Item from './Item';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
    },
}));

export default function SelectedListItem() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List component="div" aria-label="main mailbox folders">
                <Item MainPrimary="Testing 1" key="1"/>
                <Item MainPrimary="Testing 2" key="2"/>
                <Item MainPrimary="Testing 3" key="3"/>
                <Item MainPrimary="Testing 4" key="4"/>

            </List>
            
            <Divider />
        </div>
    );
}
