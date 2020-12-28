import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Item from './Item';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
    },
}));

export default function SelectedListItem(props) {

    useEffect(() => {
        console.log(
        )
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            { props.statusGetCollection.loading? "" :
                <List component="div" aria-label="main mailbox folders">
                    <Item MainPrimary="Profile" key="0" type="profile" />
                    {props.listCollectionId.map((element, idx) => {
                        return (
                            <Item MainPrimary={element.name} key={idx+1} id={element.id}/>
                        )
                    })}
                </List>
            }

            <Divider />
        </div>
    );
}
