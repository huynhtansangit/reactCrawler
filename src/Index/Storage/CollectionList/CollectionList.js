import React, { useState } from 'react'; //eslint-disable-line
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import Item from './Item';
import { useEffect } from 'react';
import axios from 'axios'; //eslint-disable-line
import cookies from '../../../utils/cookie';//eslint-disable-line
import { COLLECTIONS_URL } from '../../../utils/config.url' ;//eslint-disable-line


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
    },
}));

export default function SelectedListItem(props) {

    const [isLoading, setIsLoading] = useState(true);//eslint-disable-line
    const [listCollectionId, setListCollectionId] = useState([]);

    useEffect(() => {
        getCollectionList();
    }, []);

    const getCollectionList = () =>{
        const accessToken = cookies.get("accessToken");

        let config = {
            url: COLLECTIONS_URL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${accessToken}`
            },
        };

        axios.request(config)
            .then(res => {
                console.log(res.data);
                return res.data
            })
            .then(data => {
                if (data) {
                    setListCollectionId(data["collections"])
                }
            })
            .catch(error => {
                console.log("Error occurred when trying to get your collection.");
                if (error.response) {
                    setIsLoading(false);
                    alert(error.response.data.message);
                }
                else {
                    alert("Something went wrong. Please check your internet connection.");
                }
            })
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            { isLoading? "" :
                <List component="div" aria-label="main mailbox folders">
                    <Item MainPrimary="Profile" key="0" type="profile" />
                    {listCollectionId.map((element, idx) => {
                        return (
                            <Item MainPrimary={element.name} key={idx+1} id={element.id}/>
                        )
                    })}
                </List>
            }

            {/* <Divider /> */}
        </div>
    );
}
