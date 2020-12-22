import React, { Component } from 'react';
import TabMenu from './TabMenu';
import './Storage.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import CollectionList from './CollectionList/CollectionList';
import axios from 'axios';
import cookies from '../../utils/cookie';
import { COLLECTIONS_URL } from '../../utils/config.url';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});
class Storage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusGetCollection: { loading: true, error: "false" },
            listCollectionId: [],

        }
    }

    async componentDidMount() {
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
            .then(res => res.data)
            .then(data => {
                if (data) {
                    this.setState({ statusGetCollection: { loading: false, error: "" } })
                    this.setState({ listCollectionId: data["collections"] })
                    // console.log(data["collections"])
                }
            })
            .catch(error => {
                console.log("Error occurred when trying to get your collection.");
                if (error.response) {
                    this.setState({ statusGetCollection: { loading: false, error: error.response.data['message'] } })
                    alert(error.response.data);
                }
                else {
                    alert("Something went wrong. Please check your internet connection.");
                }
            })
    }

    render() {
        const { classes } = this.props;
        return (
            <section id="storage-section">
                <div className="storage-container">
                    <img id="you-can-find-downloaded-stuff-here" src="Assets/Images/Store/Mask-Group-2-Copy.png" alt="All downloaded here" />
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12}>
                            <Paper className={classes.paper}>
                                <CollectionList
                                    statusGetCollection={this.state.statusGetCollection}
                                    listCollectionId={this.state.listCollectionId} />
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
}

export default withStyles(useStyles, { withTheme: true })(Storage);
