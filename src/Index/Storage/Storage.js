import React, { Component } from 'react';
import TabMenu from './TabMenu';
import './Storage.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import CollectionList from './CollectionList/CollectionList';
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
    render() {
        const { classes } = this.props;
        return (
            <section id="storage-section">
                <div className="storage-container">
                    <img id="you-can-find-downloaded-stuff-here" src="Assets/Images/Store/Mask-Group-2-Copy.png" alt="All downloaded here" />
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12}>
                            <Paper className={classes.paper}><CollectionList/></Paper>
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
