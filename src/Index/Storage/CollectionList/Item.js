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
        }
    }
    onClickItem = (event, index) => {
        this.setState({ isOpen: !this.state.isOpen });
        this.setState({ selectedIndex: index });
    }
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
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <RemoveOutlinedIcon style={{ color: '#F91A2C', fontSize: 40 }} />
                                </ListItemIcon>
                                <ListItemText primary="Delete" />
                            </ListItem>
                            <ListItem button className={classes.nested}>
                                <TabMenu />
                            </ListItem>
                        </List>
                    </Collapse>
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

