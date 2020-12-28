import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import TabMenu from '../TabMenu';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ProfileContent from '../ProfileTab/ProfileContent';
import axios from 'axios';
import cookies from '../../../utils/cookie';
import { COLLECTIONS_URL } from '../../../utils/config.url';
import Skeleton from '@material-ui/lab/Skeleton';
import { deleteCollection } from '../../../services/user.services'


const useStyles = theme => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
});

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedIndex: 0,
            willLoadContent: false,
            firstRender: true,
            statusGetDataOfCollection: { loading: true, error: "false" },
            dataOfCollection: [],
            isShowItem: true,
        }
    }
    onClickItem = (event, index) => {
        this.setState({ isOpen: !this.state.isOpen, selectedIndex: index, willLoadContent: true });
    }

    async componentDidUpdate() {
        if (this.state.willLoadContent && this.state.firstRender && this.props.MainPrimary !== "Profile") {
            this.setState({ willLoadContent: false });

            const accessToken = cookies.get("accessToken");

            const config = {
                url: `${COLLECTIONS_URL}/${this.props.id}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${accessToken}`
                },
            };

            // get data for collection
            await axios.request(config)
                .then(res => res.data)
                .then(data => {
                    if (data) {
                        this.setState({ statusGetDataOfCollection: { loading: false, error: "" } });
                        this.setState({ dataOfCollection: data["items"] });
                    }
                })
                .catch(error => {
                    console.log("Error occurred when trying to get your collection.");
                    if (error.response) {
                        this.setState({ statusGetDataOfCollection: { loading: false, error: error.response.data['message'] } });
                        alert(error.response.data.message);
                    }
                    else {
                        alert("Something went wrong. Please check your internet connection.");
                    }
                })
            await this.setState({ firstRender: false });
        }
    }

    clickDeleteCollection = (idCollection) => {
        if (window.confirm("Are you sure want to delete this collection?")) {
            deleteCollection(idCollection);
            this.setState({ isShowItem: false });
        }
    }
    renderTabMenu = (classes) => {
        if (this.state.statusGetDataOfCollection['loading'] === true) {
            return (
                <>
                    <Skeleton animation="wave" width='100%' height={100} />
                </>
            )
        }
        else {
            return (
                <ListItem className={classes.nested}>
                    <TabMenu dataOfCollection={this.state.dataOfCollection} />
                </ListItem>
            )
        }
    }
    renderCollapse = (classes) => (
        <>
            <ListItem
                button
                selected='true'
                onClick={(event) => this.onClickItem(event, 1)}
            >
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={this.props.MainPrimary} />
                {this.state.isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding >
                    <ListItem button className={classes.nested}
                        onClick={(e) => this.clickDeleteCollection(this.props.id)}>
                        <ListItemIcon>
                            <RemoveOutlinedIcon style={{ color: '#F91A2C', fontSize: 40 }} />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                    </ListItem>
                    {this.renderTabMenu(classes)}
                </List>
            </Collapse>
        </>
    )

    renderProfile = (type, classes) => {
        if (type === "profile") {
            return (
                <div>
                    <ListItem
                        button
                        selected='true'
                        onClick={(event) => this.onClickItem(event, 1)}
                    >
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={this.props.MainPrimary} />
                        {this.state.isOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding >
                            <ListItem className={classes.nested}>
                                <ProfileContent />
                            </ListItem>
                        </List>
                    </Collapse>
                </div>
            )
        }

        else
            return (
                <div>
                    {this.state.isShowItem && <this.renderCollapse />}
                </div>
            )
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.renderProfile(this.props.type, classes)}
            </div>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })(Item);

