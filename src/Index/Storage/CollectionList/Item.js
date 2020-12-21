import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';

const useStyles = theme => ({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  });

class Item extends Component {
    constructor(props) {
        super(props);
        this.state={
            isOpen:false,
            selectedIndex:0,
        }
    }
    onClickItem =(event, index)=>{
        this.setState({isOpen:!this.state.isOpen});
        this.setState({selectedIndex:index});
    }
    render() {
        const { classes } = this.props;
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
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                    </List>
                </Collapse>
            </div>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })(Item);

