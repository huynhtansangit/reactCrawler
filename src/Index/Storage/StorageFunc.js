import React, {useEffect, useState} from 'react';
import './Storage.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CollectionList from './CollectionList/CollectionList';
import axios from 'axios';
import cookies from '../../utils/cookie';
import { COLLECTIONS_URL } from '../../utils/config.url';

const useStyles =  makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
export default function Storage(props) {
    const classes = useStyles();
    const [listCollectionId, setListCollectionId] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(()=> {
        const accessToken = cookies.get("accessToken");

        let config = {
            url: COLLECTIONS_URL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${accessToken}`
            },
        };

        // get data for collection
        axios.request(config)
            .then(res => {
                console.log(res.data);
                return res.data
            })
            .then(data => {
                if (data) {
                    setIsLoading(false);
                    setError("");
                    setListCollectionId(data["collections"])
                }
            })
            .catch(error => {
                console.log("Error occurred when trying to get your collection.");
                if (error.response) {
                    setIsLoading(false);
                    setError(error.response.data['message'])
                    alert(error.response.data.message);
                }
                else {
                    alert("Something went wrong. Please check your internet connection.");
                }
            })
    });


    return (
        <section id="storage-section" className={classes.root}>
            <div className="storage-container">
                <img id="you-can-find-downloaded-stuff-here" src="Assets/Images/Store/Mask-Group-2-Copy.png" alt="All downloaded here" />
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12}>
                        <Paper className={classes.paper}>
                            <CollectionList
                                isLoading={isLoading}
                                listCollectionId={listCollectionId} 
                                error={error}/>
                        </Paper>
                    </Grid>
                    {/* <Grid item xs={12} sm={9}>
                        <Paper className={classes.paper}><TabMenu /></Paper>
                    </Grid> */}
                </Grid>

            </div>
        </section>
    );
}
