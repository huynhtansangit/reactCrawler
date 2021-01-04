import React from 'react';
import './Storage.css';
import Grid from '@material-ui/core/Grid';//eslint-disable-line
import Paper from '@material-ui/core/Paper';//eslint-disable-line
import { withStyles } from "@material-ui/core/styles";
import CollectionList from './CollectionList/CollectionList';//eslint-disable-line
import axios from 'axios'; //eslint-disable-line
import cookies from '../../utils/cookie';//eslint-disable-line
import { COLLECTIONS_URL } from '../../utils/config.url';//eslint-disable-line
import Button from '@material-ui/core/Button';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button:{
        width:'100% !important',
        height:60,
        '&hover':{
            background:'#F6518F !important',
        }
    },
    homeIcon:{
        fontSize:36,
        color:'#F6518F',
        
    }
});
class Storage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // statusGetCollection: { loading: true, error: "false" },
            listCollectionId: [],
            isLoading: true,
            error: "",

        }
    }

    getCollectionList = () => {
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
                    this.setState({ isLoading: false, error: "" })
                    this.setState({ listCollectionId: data["collections"] })
                    // console.log(data["collections"])
                }
            })
            .catch(error => {
                console.log("Error occurred when trying to get your collection.");
                if (error.response) {
                    this.setState({ isLoading: false, error: error.response.data['message'] })
                    alert(error.response.data.message);
                }
                else {
                    alert("Something went wrong. Please check your internet connection.");
                }
            })
    }

    componentDidMount() {

    }

    render() {
        const { classes } = this.props;//eslint-disable-line
        return (
            <section id="storage-section">
                <div className="storage-container">
                    <img id="you-can-find-downloaded-stuff-here" src="Assets/Images/Store/Mask-Group-2-Copy.png" alt="All downloaded here" />
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12}>
                            <Paper className={classes.paper}>
                                <Button variant="outlined" color="primary" href="/" className={classes.button}>
                                    <HomeSharpIcon className={classes.homeIcon}/>
                                </Button>
                                <CollectionList
                                    isLoading={this.state.isLoading}
                                    listCollectionId={this.state.listCollectionId} />
                            </Paper>
                        </Grid>
                    </Grid>

                </div>
            </section>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })(Storage);
