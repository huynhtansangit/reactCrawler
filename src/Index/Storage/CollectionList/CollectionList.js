import React, { useState } from 'react'; //eslint-disable-line
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ItemHook from './ItemHook';
import { useEffect } from 'react';
import axios from 'axios'; //eslint-disable-line
import cookies from '../../../utils/cookie';//eslint-disable-line
import { COLLECTIONS_URL } from '../../../utils/config.url' ;//eslint-disable-line


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
    },
}));

export default function SelectedListItem(props) {

    const [isLoading, setIsLoading] = useState(true);//eslint-disable-line
    const [listCollectionId, setListCollectionId] = useState([]);
    const [listCollectionHashmap, setListCollectionHashmap] = useState({});

    useEffect(() => {
        getCollectionList();
    }, []); //eslint-disable-line

    const getCollectionList = async () =>{
        const accessToken = cookies.get("accessToken");

        let config = {
            url: COLLECTIONS_URL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${accessToken}`
            },
        };

        await axios.request(config)
            .then(res => {
                // console.log(res.data.collections);
                if (res.data) {
                    setIsLoading(false);
                    setListCollectionId(res.data["collections"]);
                    createListCollectionHashmap(res.data["collections"]);
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

    const createListCollectionHashmap = (listCollection) =>{
        let hashmap = {};
        listCollection.forEach(el => {
            hashmap[el.id]=el.name;
        });
        
        setListCollectionHashmap(hashmap);
    }

    const updateListCollectionHashmap = (id, newName) =>{
        setListCollectionHashmap(prevHashmap=>{
            prevHashmap[id]= newName;
            return {...prevHashmap};
        });
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            { isLoading? "" :
                <List component="div" aria-label="main mailbox folders">
                    <ItemHook MainPrimary="Profile" key="0" type="profile" />
                    {listCollectionId.map((element, idx) => {
                        return (
                            <ItemHook MainPrimary={listCollectionHashmap[element.id]} key={idx+1} id={element.id}
                                updateListCollection={(id, newName)=>{updateListCollectionHashmap(id, newName)}}
                                nameCollectionWillBeOpen={props.nameCollectionWillBeOpen}
                            />
                        )
                    })}
                </List>
            }

            <Divider />
        </div>
    );
}
